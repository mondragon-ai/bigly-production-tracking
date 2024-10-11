import {algoliasearch} from "algoliasearch";

type AlgoliaIndexTypes = "inventory_index" | "items_index";
const client = algoliasearch("UPRAWCOIS2", "527c18f3b7b71cf3626fe97c53083f75");

export const fetchSearchResults = async (
  query: string,
  index: AlgoliaIndexTypes,
) => {
  if (!query) return [];

  try {
    const {results} = await client.search({
      requests: [
        {
          indexName: index,
          query: query,
          hitsPerPage: 50,
        },
      ],
    });

    console.log(results);

    return (results[0] as any).hits || [];
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
  return [];
};
