import {SERVER_URL} from "../constants";
import {BiglyServerResponse, ServerResponse} from "../types/shared";

/**
 * Initial request function for Shopify
 * @param data
 * @param token
 * @param shop
 * @returns Response from fetch or error message
 */
export const shopifyGraphQlRequest = async (
  shop: string,
  token: string,
  payload: any,
) => {
  const URL = `https://${shop}.myshopify.com/api/2021-07/graphql.json`;

  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": token as string,
  };

  try {
    const options: any = {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    };

    const response = await fetch(URL, options);
    const data = await response.json();

    return {status: response.status, message: "Fetched", data: data.data};
  } catch (error) {
    return {status: 500, message: "Server Error: Fetching Graphql", data: null};
  }
};
