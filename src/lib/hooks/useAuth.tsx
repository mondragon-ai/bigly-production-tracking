"use client";
import {useGlobalContext} from "../store/context";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {useState} from "react";
import {UserType} from "../types/store";

interface LoginResponse {
  success: boolean;
  error?: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {setGlobalState} = useGlobalContext();
  const router = useRouter();

  const login = async (
    email: string,
    password: string,
  ): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);
    try {
      //   const response = await fetch('/api/login', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ email, password }),
      //   });

      //   if (!response.ok) {
      //     throw new Error('Login failed, please check your credentials.');
      //   }

      //   const data = await response.json();

      const user: UserType = {
        id: "exampleId",
        name: "User Name",
        email: "testyMctester@gmail.com",
        role: "admin",
        jwt: "exampleJWTToken",
        position: "printing",
      };

      // Update global state and save session
      setGlobalState("user", user);

      toast.success("Logged In");
      router.push("/jobs");
      return {success: true};
    } catch (error: any) {
      setError(error.message);
      return {success: false, error: error.message};
    } finally {
      setLoading(false);
    }
  };

  return {login, loading, error};
};

export default useLogin;
