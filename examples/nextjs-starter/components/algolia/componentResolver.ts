import { ComponentType } from 'react';
import { ComponentInstance } from '@uniformdev/canvas';
import { DefaultNotImplementedComponent, ComponentProps } from '@uniformdev/canvas-react';
import CanvasInstantSearch from "@/components/algolia/CanvasInstantSearch";
import CanvasSearchBox from '@/components/algolia/CanvasSearchBox';
import CanvasRefinementList from '@/components/algolia/CanvasRefinementList';
import CanvasHits from '@/components/algolia/CanvasHits';
import CanvasPagination from '@/components/algolia/CanvasPagination';
import CanvasIndex from '@/components/algolia/CanvasIndex';
import CanvasBasicComponents from '@/components/algolia/BasicComponents';

const componentMappings: Record<string, ComponentType<ComponentProps<any>>> = {
  'algolia-instantSearch': CanvasInstantSearch,
  'algolia-index': CanvasIndex,
  'algolia-searchBox': CanvasSearchBox,
  'algolia-refinementList': CanvasRefinementList,
  'algolia-hits': CanvasHits,
  'algolia-pagination': CanvasPagination,
  'algolia-basicComponents': CanvasBasicComponents,
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function componentResolver(component: ComponentInstance): ComponentType<ComponentProps<any>> | null {
  const { variant } = component;
  const componentName = variant ? `${component.type}${capitalizeFirstLetter(variant)}` : component.type;
  return componentMappings[componentName] || DefaultNotImplementedComponent;
}

export default componentResolver;
