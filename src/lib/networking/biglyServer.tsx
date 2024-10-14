import {SERVER_URL} from "../constants";
import {BiglyServerResponse, ServerResponse} from "../types/shared";

export const biglyRequest = async (
  resource: string,
  method: "GET" | "POST" | "DELETE" | "PUT",
  payload: null | any,
): Promise<BiglyServerResponse> => {
  const url = `${SERVER_URL}${resource}`;
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(url, options);

  if (response.status == 204) {
    return {status: response.status, data: null, message: "Created"};
  }
  const data = (await response.json()) as ServerResponse;

  return {status: response.status, message: data.message, data: data.data};
};
