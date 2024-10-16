"use client";
import {handleHttpError} from "@/app/shared";
import {LoadingTypes} from "../types/shared";
import {useState, useEffect} from "react";
import {Influencer} from "../types/jobs";
import {biglyRequest} from "../networking/biglyServer";
import toast from "react-hot-toast";

interface ItemReturn {
  influencers: Influencer[];
  loading: LoadingTypes;
  error: string | null;
}

const useInfluencers = (): ItemReturn => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>("loading");

  const fetchItems = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        "/app/influencers",
        "GET",
        null,
      );

      console.log({data, status});

      if (status < 300 && data) {
        toast.success("Fetched Data");
        setInfluencers(data.influencers);
        return;
      } else {
        handleHttpError(status, `${message}`, setError);
      }
      return;
    } catch (err) {
      handleHttpError(500, "Server Error", setError);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    loading,
    error,
    influencers,
  };
};

export default useInfluencers;
