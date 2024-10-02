"use client";
import {useState, useEffect} from "react";
import {uploadToServer} from "../utils/storage";
import {image_list} from "../data/images";
import {ImageDocument} from "../types/images";
import {LoadingTypes} from "../types/shared";
import {JobDocument} from "../types/jobs";
import {job_list} from "../data/jobs";

interface JobReturn {
  jobs: JobDocument[];
  loading: LoadingTypes;
  error: string | null;
}

const useJobs = (): JobReturn => {
  const [jobs, setJobs] = useState<JobDocument[]>(job_list);
  const [loading, setLoading] = useState<LoadingTypes>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading("loading");
    try {
      const delay = (s: number) => {
        return new Promise((resolve) => setTimeout(resolve, s));
      };
      await delay(3000);
      //   const response = await fetch("/api/images");
      //   if (!response.ok) throw new Error("Failed to fetch images");
      //   const data: Image[] = await response.json();
      //   setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    loading,
    error,
    jobs,
  };
};

export default useJobs;
