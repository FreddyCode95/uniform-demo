import algoliasearch from 'algoliasearch/lite';

// This needs to be a Query Suggestions Index
export const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
);
