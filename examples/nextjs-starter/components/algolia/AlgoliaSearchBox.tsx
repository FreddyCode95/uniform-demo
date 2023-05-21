import React from 'react';
import { SearchBox } from 'react-instantsearch-hooks-web';
import {ComponentProps, registerUniformComponent} from '@uniformdev/canvas-react';
import AlgoliaInstantSearch from "@/components/algolia/AlgoliaInstantSearch";

type CanvasSearchBoxProps = {
  searchBoxParams?: {
    searchBoxProps?: {
      placeholder?: string;
      searchAsYouType?: boolean;
    };
  };
};

const AlgoliaSearchBox = ({ searchBoxParams }: ComponentProps<CanvasSearchBoxProps>) => {
  const { searchBoxProps } = searchBoxParams || {};
  return (
    <div className="searchBox">
      <h6>search box should be here</h6>
      <SearchBox {...searchBoxProps} />
    </div>
  );
};

registerUniformComponent({
  type: "algolia-searchBox",
  component: AlgoliaSearchBox,
});

export default AlgoliaSearchBox;
