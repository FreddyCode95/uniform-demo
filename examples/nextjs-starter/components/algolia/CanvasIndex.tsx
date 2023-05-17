import React from 'react';
import { Index } from 'react-instantsearch-hooks-web';
import componentResolver from '@/components/algolia/componentResolver';
import {ComponentProps, registerUniformComponent, UniformSlot} from '@uniformdev/canvas-react';
import { getDefaultIndexName } from '../../context/CanvasAlgoliaProvider';
import ErrorPropertyCallout from '@/components/algolia/ErrorPropertyCallout';
import CanvasInstantSearch from "@/components/algolia/CanvasInstantSearch";

type CanvasIndexProps = {
  indexParams?: {
    indexProps?: {
      indexName?: string;
      indexId?: string;
    };
  };
};

const CanvasIndex = (componentProps: ComponentProps<CanvasIndexProps>) => {
  const { indexProps } = componentProps?.indexParams || {};
  const indexName = indexProps?.indexName || getDefaultIndexName();

  if (!indexName) {
    return <ErrorPropertyCallout title="Property 'indexName' was not defined for Index component." />;
  }

  return (
      <div className="index">
        <Index {...indexProps} indexName={indexName}>
          <UniformSlot name="widgets" resolveRenderer={componentResolver} />
        </Index>
      </div>
  );
};

registerUniformComponent({
  type: "algolia-index",
  component: CanvasIndex,
});

export default CanvasIndex;
