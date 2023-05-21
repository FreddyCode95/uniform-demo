import React from 'react';
import {ComponentProps, registerUniformComponent, UniformSlot} from '@uniformdev/canvas-react';
// import componentResolver from './componentResolver';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import getConfig from 'next/config';
import ErrorPropertyCallout from '@/components/algolia/ErrorPropertyCallout';
import CanvasAlgoliaProvider from "@/context/CanvasAlgoliaProvider";
import process from "process";

const {
  publicRuntimeConfig: { applicationId, algoliaApiKey },
} = getConfig();

// const searchClient = algoliasearch(applicationId, algoliaApiKey);
const searchClient = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY);

type CanvasInstantSearchProps = {
  title?: string;
  instantSearchParams?: {
    instantSearchProps?: {
      indexName?: string;
      stalledSearchDelay?: number;
    };
  };
};

const AlgoliaInstantSearch: React.FC<CanvasInstantSearchProps> = ({ instantSearchParams, title }: CanvasInstantSearchProps) => {
  const { instantSearchProps } = instantSearchParams || {};

  if (!instantSearchProps?.indexName) {
    return <ErrorPropertyCallout title="Property 'indexName' was not defined for InstantSearch component." />;
  }

  return (
    <CanvasAlgoliaProvider defaultIndexName={instantSearchProps.indexName}>
      {Boolean(title) && <h2>{title}</h2>}
      <InstantSearch
        {...instantSearchProps}
        indexName={instantSearchProps.indexName}
        searchClient={searchClient}
      >
        <UniformSlot name="widgets" />
      </InstantSearch>
    </CanvasAlgoliaProvider>
  );
};

registerUniformComponent({
  type: "algolia-instantSearch",
  component: AlgoliaInstantSearch,
});

export default AlgoliaInstantSearch;