"use client";
import {delay, handleHttpError} from "../utils/shared";
import {useGlobalContext} from "../store/context";
import {useRouter} from "next/navigation";
import {UserType} from "../types/store";
import toast from "react-hot-toast";
import {useState} from "react";
import {SERVER_URL} from "../constants";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {setGlobalState} = useGlobalContext();
  const router = useRouter();

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    console.log({url: `${SERVER_URL}/login`});
    try {
      await delay(1500);
      const payload = {email, password};
      // const response = await fetch(`${SERVER_URL}/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(payload),
      // });

      // const data = await response.json();
      // console.log(data);

      if (true) {
        const user: UserType = {
          id: "exampleId",
          name: "User Name",
          email: email,
          role: "admin",
          jwt: "exampleJWTToken",
          position: "printing",
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
