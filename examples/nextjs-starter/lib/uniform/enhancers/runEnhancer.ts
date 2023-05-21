// followed these steps
// https://docs.uniform.app/docs/integrations/search/algolia/add-algolia-enhancer

// general enhancer plumbing
import { EnhancerBuilder, enhance } from '@uniformdev/canvas';

// Algolia specific imports
import {
    createEnhancer,
    ALGOLIA_PARAMETER_TYPES,
    AlgoliaClient,
} from '@uniformdev/canvas-algolia';

const algoliaClient = new AlgoliaClient({
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    searchKey: process.env.ALGOLIA_API_KEY,
});

/* in the tutorial it has the code like this

const algoliaEnhancer = createEnhancer({
    clients: algoliaClient
});

await enhance({
    composition,
    enhancers: new EnhancerBuilder().parameterType(ALGOLIA_PARAMETER_TYPES, algoliaEnhancer),
    context: {},
});

*/
export default async function runEnhancer(composition, context) {
    const algoliaEnhancer = createEnhancer({
        clients: algoliaClient
    });

    await enhance({
        composition,
        enhancers: new EnhancerBuilder().parameterType(ALGOLIA_PARAMETER_TYPES, algoliaEnhancer),
        context: {},
    });

    return composition;
}