"use client";
import {useState, useEffect, Dispatch, SetStateAction} from "react";
import {biglyRequest} from "../networking/biglyServer";
import {Items, JobDocument} from "../types/jobs";
import {handleHttpError} from "../utils/shared";
import {LoadingTypes} from "../types/shared";
import toast from "react-hot-toast";

interface JobReturn {
  job: JobDocument | null;
  loading: LoadingTypes;
  error: string | null;
  item: Items | null;
  selectItem: (id: string) => void;
  deleteJob: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  approveJob: (id: string) => Promise<void>;
  setError: Dispatch<SetStateAction<string | null>>;
}

const useJob = (id: string): JobReturn => {
  const [job, setJob] = useState<JobDocument | null>(null);
  const [item, setItem] = useState<Items | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        "/app/jobs",
        "GET",
        null,
      );

      if (status < 300 && data) {
        toast.success("Fetched Data");
        setJob(data.jobs);
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
    fetchJobs();
  }, []);

  const selectItem = (id: string) => {
    setLoading("requesting");
    setItem(null);
    const item = job?.items.find((i) => i.id == id);
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
    item,
    selectItem,
    setError,
    deleteJob,
    approveJob,
    removeItem,
  };
};

export default useJob;
