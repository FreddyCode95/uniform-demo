import {
    registerUniformComponent,
    ComponentProps,
} from "@uniformdev/canvas-react";
import {Hits, InstantSearch, RefinementList} from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch/lite";
import * as process from "process";

type HeroProps = ComponentProps<{
    title: string;
    description?: string;
    subtitle?: string;
}>;

const searchClient = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY);

const AlgoliaSearch: React.FC = ({}) => (
    <InstantSearch searchClient={searchClient} >
        <RefinementList attribute='name' />
    </InstantSearch>
);

registerUniformComponent({
    type: "algoliasearch",
    component: AlgoliaSearch,
});

export default AlgoliaSearch;
