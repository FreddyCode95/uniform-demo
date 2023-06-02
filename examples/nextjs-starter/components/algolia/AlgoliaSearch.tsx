import {
    registerUniformComponent,
    ComponentProps,
} from "@uniformdev/canvas-react";
import {Hits, InstantSearch, RefinementList, SearchBox} from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch/lite";
import * as process from "process";

type HeroProps = ComponentProps<{
    title: string;
    description?: string;
    subtitle?: string;
}>;

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);

function Hit({ hit }) {
    return (
        <article>
            <img src={hit.image} alt={hit.name} />
            <p>{hit.categories[0]}</p>
            <h1>{hit.name}</h1>
            <p>${hit.price}</p>
        </article>
    );
}

const AlgoliaSearch: React.FC = ({}) => (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
        <SearchBox />
        <Hits hitComponent={Hit} />
    </InstantSearch>
);

registerUniformComponent({
    type: "algoliasearch",
    component: AlgoliaSearch,
});

export default AlgoliaSearch;
