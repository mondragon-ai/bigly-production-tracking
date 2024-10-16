"use client";
import {biglyRequest} from "../networking/biglyServer";
import {useGlobalContext} from "../store/context";
import {LoadingTypes} from "../types/shared";
import {useRouter} from "next/navigation";
import {SetStateAction, useState, Dispatch, useCallback} from "react";
import {AppContextType, UserType} from "../types/store";
import toast from "react-hot-toast";
import {handleHttpError} from "@/app/shared";

type UseProfileReturnType = {
  error: string | null;
  loading: LoadingTypes;
  user: AppContextType["user"];
  setError: Dispatch<SetStateAction<string | null>>;
  updatePassword: (password: string) => Promise<void>;
};

const useProfile = (): UseProfileReturnType => {
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);
  const {globalState, setGlobalState} = useGlobalContext();

  const updatePassword = useCallback(
    async (password: string) => {
      setLoading("requesting");
      setError(null);
      try {
        console.log("READY TO UPDATE: ", password);
        const {status, message} = await biglyRequest(
          `/auth/password/${globalState.user.email}`,
          "POST",
          {password},
        );

        if (status < 300) {
          toast.success(message);
          return;
        } else {
          handleHttpError(status, message, setError);
          return;
        }
      } catch (error: any) {
        handleHttpError(500, "Server Error.", setError);
        return;
      } finally {
        setLoading(null);
      }
    },
    [globalState],
  );

  return {loading, error, user: globalState.user, setError, updatePassword};
};

export default useProfile;
