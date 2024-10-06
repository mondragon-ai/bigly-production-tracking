"use client";
import {useCallback, useEffect, useState} from "react";
import {AppContext} from "../store/context";
import {
  AppContextType,
  ContextType,
  GlobalStateType,
  UserType,
} from "../types/store";
import {useRouter} from "next/navigation";
import {initGlobalValues} from "../data/store";
import {getItem, saveItem} from "../store/session";

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [state, setState] = useState<AppContextType>(initGlobalValues);
  const router = useRouter();

  useEffect(() => {
    const fetchData = () => {
      const auth = (getItem("user") as UserType) || state;
      console.log({auth});

      if (!auth.jwt) {
        router.push("/");
      } else {
        setState((p) => ({...p, user: auth}));
      }
    };
    fetchData();
  }, []);

  const setGlobalState = useCallback(
    (type: GlobalStateType, data: any) => {
      const sessionState = (getItem(type) as UserType) || state[type];

      console.log({sessionState, data});

      setState((p) => ({
        ...p,
        [type]: {
          ...sessionState,
          ...data,
        },
      }));
      saveItem(type, {
        ...sessionState,
        ...data,
      });
    },
    [state],
  );

  const contextValue: ContextType = {
    globalState: state,
    setGlobalState: setGlobalState,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
