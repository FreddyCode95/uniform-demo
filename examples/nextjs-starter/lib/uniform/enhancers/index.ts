// general enhancer plumbing
import { EnhancerBuilder, enhance } from '@uniformdev/canvas';

// Algolia specific imports
import {
  createEnhancer,
  ALGOLIA_PARAMETER_TYPES,
  AlgoliaClient,
} from '@uniformdev/canvas-algolia';

// import getContentfulEnhancer from "./contentful";

const algoliaClient = new AlgoliaClient({
  applicationId: process.env.ALGOLIA_APPLICATION_ID,
  searchKey: process.env.ALGOLIA_API_KEY,
});

const algoliaEnhancer = createEnhancer({
  clients: algoliaClient
});

export default async function runEnhancers(composition: any, context) {

  await enhance({
    composition,
    enhancers: new EnhancerBuilder().parameterType(ALGOLIA_PARAMETER_TYPES, algoliaEnhancer),
    context,
  });

  return composition;
}
