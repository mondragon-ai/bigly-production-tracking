import {StoreDocument} from "../types/settings";

export const searchProductPayload = (
  curr_store: StoreDocument,
  query: string,
) => {
  const shop = curr_store.domain.split(".")[0];
  const payload = {
    query: `
        query ($query: String!) {
          products(first: 1, query: $query) {
            edges {
              node {
                id
                title
                variants(first: 100) {
                  edges {
                    node {
                      id
                      sku
                      title
                      price {
                        amount
                      }
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    variables: {
      query: `${query}`,
    },
  };

  return {shop, payload};
};
