import React, {useMemo} from "react";
import {
    createElement,
    Fragment,
    useEffect,
    useRef,
    useState
} from "react";
import { render } from "react-dom";

import { usePagination, useSearchBox } from "react-instantsearch-hooks";
import { autocomplete, AutocompleteOptions } from "@algolia/autocomplete-js";
import { BaseItem } from "@algolia/autocomplete-core";

// Query suggestions
import type { SearchClient } from "algoliasearch/lite";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import {INSTANT_SEARCH_QUERY_SUGGESTIONS} from "./constants";

import "@algolia/autocomplete-theme-classic";
import {createLocalStorageRecentSearchesPlugin} from "@algolia/autocomplete-plugin-recent-searches";

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
    searchClient: SearchClient;
    className?: string;
};

type SetInstantSearchUiStateOptions = {
    query: string;
};

export function Autocomplete({
                                 searchClient,
                                 className,
                                 ...autocompleteProps
                             }: AutocompleteProps) {
    const autocompleteContainer = useRef<HTMLDivElement>(null);

    const { query, refine: setQuery } = useSearchBox();
    const { refine: setPage } = usePagination();

    const plugins = useMemo(() => {
        const recentSearches = createLocalStorageRecentSearchesPlugin({
            key: 'instantsearch',
            limit: 3,
            transformSource({ source }) {
                return {
                    ...source,
                    onSelect({ item }) {
                        setInstantSearchUiState({
                            query: item.label,
                        });
                    },
                };
            },
        });

        const querySuggestions = createQuerySuggestionsPlugin({
            searchClient,
            indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
            getSearchParams() {
                return recentSearches.data!.getAlgoliaSearchParams({
                    hitsPerPage: 6
                });
            },
            transformSource({ source }) {
                return {
                    ...source,
                    sourceId: "querySuggestionsPlugin",
                    onSelect({ item }) {
                        setInstantSearchUiState({ query: item.query });
                    },
                    getItems(params) {
                        if (!params.state.query) {
                            return [];
                        }

                        return source.getItems(params);
                    },
                };
            }
        });

        return [recentSearches, querySuggestions];
}, []);

    const [instantSearchUiState, setInstantSearchUiState] = useState<
        SetInstantSearchUiStateOptions
    >({ query });

    useEffect(() => {
        setQuery(instantSearchUiState.query);
        setPage(0);
    }, [instantSearchUiState]);

    useEffect(() => {
        if (!autocompleteContainer.current) {
            return;
        }

        const autocompleteInstance = autocomplete({
            ...autocompleteProps,
            container: autocompleteContainer.current,
            initialState: { query },
            onReset() {
                setInstantSearchUiState({ query: "" });
            },
            onSubmit({ state }) {
                setInstantSearchUiState({ query: state.query });
            },
            onStateChange({ prevState, state }) {
                if (prevState.query !== state.query) {
                    setInstantSearchUiState({
                        query: state.query
                    });
                }
            },
            renderer: { createElement, Fragment, render },
        });

        return () => autocompleteInstance.destroy();
    }, []);

    return <div className={className} ref={autocompleteContainer} />;
}