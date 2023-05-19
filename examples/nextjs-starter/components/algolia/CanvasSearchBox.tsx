import React from 'react';
import { SearchBox } from 'react-instantsearch-hooks-web';
import {ComponentProps, registerUniformComponent} from '@uniformdev/canvas-react';
import CanvasInstantSearch from "@/components/algolia/CanvasInstantSearch";

type CanvasSearchBoxProps = {
  searchBoxParams?: {
    searchBoxProps?: {
      placeholder?: string;
      searchAsYouType?: boolean;
    };
  };
};

const CanvasSearchBox = ({ searchBoxParams }: ComponentProps<CanvasSearchBoxProps>) => {
  const { searchBoxProps } = searchBoxParams || {};
  return (
    <div className="searchBox">
      <SearchBox {...searchBoxProps} />
    </div>
  );
};

registerUniformComponent({
  type: "algolia-searchBox",
  component: CanvasSearchBox,
});

export default CanvasSearchBox;
