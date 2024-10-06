"use client";
import {createContext, useContext} from "react";
import {initGlobalValues} from "@/lib/data/store";
import {ContextType, GlobalStateType, UserType} from "@/lib/types/store";

const contextDefaultValues: ContextType = {
  globalState: initGlobalValues,
  setGlobalState: (type: GlobalStateType, data: UserType) => {},
};

export const AppContext = createContext<ContextType>(contextDefaultValues);

export function useGlobalContext() {
  return useContext(AppContext);
}
