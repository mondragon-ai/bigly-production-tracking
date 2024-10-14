"use client";
import {useState, useEffect} from "react";
import {LoadingTypes} from "../types/shared";
import {JobDocument} from "../types/jobs";
import {job_list} from "../data/jobs";
import {biglyRequest} from "../networking/biglyServer";
import toast from "react-hot-toast";
import {handleHttpError} from "../../app/shared";

interface JobReturn {
  jobs: JobDocument[];
  loading: LoadingTypes;
  error: string | null;
}

const useJobs = (): JobReturn => {
  const [jobs, setJobs] = useState<JobDocument[]>([]);
  const [loading, setLoading] = useState<LoadingTypes>(null);
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
        setJobs(data.jobs);
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

  return {
    loading,
    error,
    jobs,
  };
};

export default useJobs;
