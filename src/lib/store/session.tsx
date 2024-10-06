import {GlobalStateType, UserType} from "../types/store";

export function saveItem(key: GlobalStateType, value: UserType) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export function getItem(key: GlobalStateType) {
  if (typeof window !== "undefined") {
    const got = sessionStorage.getItem(key);
    return JSON.parse(got as string);
  }
}
