"use client";
import {delay, handleHttpError} from "../utils/shared";
import {useGlobalContext} from "../store/context";
import {useRouter} from "next/navigation";
import {UserType} from "../types/store";
import toast from "react-hot-toast";
import {useState} from "react";
import {SERVER_URL} from "../constants";
import {ServerResponse} from "../types/shared";
import {biglyRequest} from "../networking/biglyServer";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {setGlobalState} = useGlobalContext();
  const router = useRouter();

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const payload = {email, password};
      const {status, data} = await biglyRequest("/auth/login", "POST", payload);

      if (data && status < 300) {
        const user: UserType = {
          ...data.data.user,
          jwt: data.data.jwt || "",
        };

        setGlobalState("user", user);

        toast.success("Logged In");
        router.push("/analytics");
        return;
      } else {
        handleHttpError(500, "error", setError);
        return;
      }
    } catch (error: any) {
      handleHttpError(500, "Server Error.", setError);
      return;
    } finally {
      setLoading(false);
    }
  };

  return {login, loading, error, setError};
};

export default useLogin;
