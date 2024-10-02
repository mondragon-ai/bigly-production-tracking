"use client";
import {useState, useEffect} from "react";
import {LoadingTypes} from "../types/shared";
import {Items, JobDocument} from "../types/jobs";
import {job_list} from "../data/jobs";

interface JobReturn {
  job: JobDocument;
  loading: LoadingTypes;
  error: string | null;
  selectItem: (id: string) => void;
  deleteJob: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  approveJob: (id: string) => Promise<void>;
  item: Items | null;
}

const useJob = (id: string): JobReturn => {
  const [job, setJob] = useState<JobDocument>(
    job_list.find((j) => j.id == id) || job_list[0],
  );
  const [item, setItem] = useState<Items | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading("loading");
    try {
      const delay = (s: number) => {
        return new Promise((resolve) => setTimeout(resolve, s));
      };
      await delay(1500);
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

  const selectItem = (id: string) => {
    setLoading("requesting");
    setItem(null);
    const item = job.items.find((i) => i.id == id);
    if (item) setItem(item);
    setLoading(null);
  };

  const deleteJob = async (id: string) => {
    setLoading("posting");
    try {
      const delay = (s: number) => {
        return new Promise((resolve) => setTimeout(resolve, s));
      };
      await delay(500);
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

  const removeItem = async () => {
    setLoading("posting");
    try {
      const delay = (s: number) => {
        return new Promise((resolve) => setTimeout(resolve, s));
      };
      await delay(500);
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

  const approveJob = async () => {
    setLoading("posting");
    try {
      const delay = (s: number) => {
        return new Promise((resolve) => setTimeout(resolve, s));
      };
      await delay(500);
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

  return {
    loading,
    error,
    job,
    selectItem,
    item,
    deleteJob,
    approveJob,
    removeItem,
  };
};

export default useJob;
