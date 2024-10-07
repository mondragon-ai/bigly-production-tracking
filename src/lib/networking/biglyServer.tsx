import {SERVER_URL} from "../constants";
import {BiglyServerResponse, ServerResponse} from "../types/shared";

export const biglyRequest = async (
  resource: string,
  method: "GET" | "POST" | "DELETE",
  payload: null | any,
): Promise<BiglyServerResponse> => {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(`${SERVER_URL}${resource}`, options);
  if (response.status == 204) {
    return {status: response.status, data: null, message: "Created"};
  }
  const data = (await response.json()) as ServerResponse;

  return {status: response.status, message: data.message, data: data.data};
};
