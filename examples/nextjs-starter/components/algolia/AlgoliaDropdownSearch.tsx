import React from 'react';
import {registerUniformComponent, UniformSlot} from '@uniformdev/canvas-react';
import algoliasearch from 'algoliasearch/lite';
import {
    Configure, HierarchicalMenu,
    Highlight,
    Hits,
    InstantSearch,
    Pagination,
    RefinementList,
    SearchBox
} from 'react-instantsearch-hooks-web';
import ErrorPropertyCallout from '@/components/algolia/ErrorPropertyCallout';
import process from "process";
import CanvasAlgoliaProvider from "@/context/CanvasAlgoliaProvider";
import AlgoliaInstantSearch from "@/components/algolia/AlgoliaInstantSearch";
import {AlgoliaHit} from "instantsearch.js";
// import {Autocomplete} from "@/components/algolia/autocomplete/Autocomplete";
// import {Autocomplete} from "@/components/algolia/Autocomplete";
import {Panel} from "@/components/algolia/autocomplete2/Panel";
import {Hit} from "@/components/algolia/autocomplete2/Hit";
import {INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES} from "@/components/algolia/autocomplete2/constants";
import {Autocomplete} from "@/components/algolia/autocomplete2/Autocomplete";

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);

type HitProps = {
    hit: AlgoliaHit<{
        name: string;
        image: string;
        brand: string;
    }>;
};

// function Hit({ hit }: HitProps) {
//     return (
//         <article className="hit">
//             <div className="hit-image">
//                 <img src={hit.image} alt={hit.name} />
//             </div>
//             <div>
//                 <h1>
//                     <Highlight hit={hit} attribute="name" />
//                 </h1>
//                 <div>
//                     By <strong>{hit.brand}</strong> in{" "}
//                 </div>
//             </div>
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


const AlgoliaDropdownSearch: React.FC<CanvasInstantSearchProps> = ({ instantSearchParams, title }: CanvasInstantSearchProps) => {
    const { instantSearchProps } = instantSearchParams || {};

    console.log("id", process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID);
    if (!instantSearchProps?.indexName) {
        return <ErrorPropertyCallout title="Property 'indexName' was not defined for InstantSearch component." />;
    }

    return (
        // <CanvasAlgoliaProvider defaultIndexName={instantSearchProps.indexName}>
        //     {Boolean(title) && <h2>{title}</h2>}
            <div>
            <InstantSearch
                {...instantSearchProps}
                indexName={instantSearchProps.indexName}
                searchClient={searchClient}
                routing // don't know what this does
            >
                <header className="header">
                    <div className="header-wrapper wrapper">
                        <nav className="header-nav">
                            <a href="/">Home</a>
                        </nav>
                        <Autocomplete
                            searchClient={searchClient}
                            placeholder="Search products"
                            detachedMediaQuery="none"
                            openOnFocus
                        />
                    </div>
                </header>

                <Configure
                    attributesToSnippet={['name:7', 'description:15']}
                    snippetEllipsisText="…"
                />
                <div className="container wrapper">
                    <div>
                        <Panel header="Categories">
                            <HierarchicalMenu
                                attributes={INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES}
                            />
                        </Panel>
                    </div>
                    <div>
                        <Hits hitComponent={Hit} />
                        <Pagination />
                    </div>
                </div>
            </InstantSearch>
        </div>
    );
};

registerUniformComponent({
    type: "algolia-dropdown-search",
    component: AlgoliaDropdownSearch,
})

export default AlgoliaDropdownSearch;