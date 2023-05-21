import React from 'react';
import {ComponentProps, registerUniformComponent} from "@uniformdev/canvas-react";
import { renderHits } from "@/components/algolia/HitComponents";
import AlgoliaHero from "@/components/algolia/AlgoliaHero";

const CanvasHits = (componentProps: ComponentProps) => {
  return <div className="hits">{renderHits(componentProps.component)}</div>;
};

registerUniformComponent({
  type: "algolia-hits",
  component: CanvasHits,
});
export default CanvasHits;
