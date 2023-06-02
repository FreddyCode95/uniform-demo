import {
    Configure,
    CurrentRefinements,
    Highlight,
    Hits,
    InstantSearch,
} from 'react-instantsearch-hooks-web';

// import './App.css';
import type { Hit } from 'instantsearch.js';

import { SearchBoxWithSuggestions } from '../algolia/autocomplete3/SearchBoxWithSuggestions';
import { searchClient } from '../algolia/autocomplete3/searchClient';
import {registerUniformComponent} from "@uniformdev/canvas-react";
import AlgoliaDropdownSearch from "@/components/algolia/AlgoliaDropdownSearch";
import React from "react";
import process from "process";
import ErrorPropertyCallout from "@/components/algolia/ErrorPropertyCallout";
import Hitt from './HitComponents/Hit'; // had to rename function because of same name as instantsearch import

// type HitProps = {
//     hit: Hit;
// };

// function Hitt({ hit }: HitProps) {
//     return (
//         <article>
//             <Highlight attribute="name" hit={hit} />
//
//         </article>
//     );
// }

type CanvasInstantSearchProps = {
    title?: string;
    instantSearchParams?: {
        instantSearchProps?: {
            indexName?: string;
            stalledSearchDelay?: number;
        };
    };
};
const AlgoliaDropdownSearch3: React.FC<CanvasInstantSearchProps> = ({ instantSearchParams, title }: CanvasInstantSearchProps) => {
    const { instantSearchProps } = instantSearchParams || {};

    console.log("id", process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID);
    if (!instantSearchProps?.indexName) {
        return <ErrorPropertyCallout title="Property 'indexName' was not defined for InstantSearch component." />;
    }

    return (
        <div className="container">
            <InstantSearch
                {...instantSearchProps}
                searchClient={searchClient}
                indexName="instant_search"
                insights={true}
            >
                <Configure hitsPerPage={16} />

                <header className="header">
                    <div className="header-wrapper wrapper">
                        <nav className="header-nav">
                            <a href="/">Home</a>
                        </nav>
                        <SearchBoxWithSuggestions />

                    </div>
                </header>

                <CurrentRefinements
                    className="current-refinements"
                    includedAttributes={['query', 'categories']}
                />

                <Hits hitComponent={Hitt} />
            </InstantSearch>
        </div>
    );
}

registerUniformComponent({
    type: "algolia-dropdown-search3",
    component: AlgoliaDropdownSearch3,
})

export default AlgoliaDropdownSearch3;
