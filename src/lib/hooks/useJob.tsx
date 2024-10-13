"use client";
import {useState, useEffect, Dispatch, SetStateAction} from "react";
import {biglyRequest} from "../networking/biglyServer";
import {Items, JobDocument} from "../types/jobs";
import {findNextStage, handleHttpError} from "../utils/shared";
import {LoadingTypes} from "../types/shared";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {useGlobalContext} from "../store/context";

interface JobReturn {
  job: JobDocument | null;
  loading: LoadingTypes;
  error: string | null;
  item: Items | null;
  selectItem: (id: string) => void;
  deleteJob: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  approveJob: (id: string) => Promise<void>;
  assignStaff: () => Promise<void>;
  rejectItem: (item_id: string) => Promise<void>;
  completeStation: () => Promise<void>;
  setError: Dispatch<SetStateAction<string | null>>;
}

const useJob = (id: string): JobReturn => {
  const router = useRouter();
  const {globalState} = useGlobalContext();
  const [job, setJob] = useState<JobDocument | null>(null);
  const [item, setItem] = useState<Items | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        `/app/jobs/${id}`,
        "GET",
        null,
      );

      if (status < 300 && data) {
        toast.success("Fetched Data");
        setJob(data.job);
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
    setError(null);

    try {
      const {status, data, message} = await biglyRequest(
        `/app/jobs/${id}`,
        "DELETE",
        null,
      );

      if (status < 300) {
        toast.success("Deleted Job");
        router.push("/jobs");
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

  const removeItem = async () => {
    setLoading("posting");
    setError(null);

    try {
      const {status, message} = await biglyRequest(
        `/app/jobs/${id}/remove/${item?.id}`,
        "PUT",
        null,
      );

      if (status < 300) {
        toast.success("Removed Jobs");
        const new_list = job ? job.items.filter((i) => i.id !== id) : [];
        setItem(null);
        setJob((p) => p && {...p, items: new_list});
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

  const assignStaff = async () => {
    setLoading("posting");
    const {user} = globalState;

    try {
      const {status, data, message} = await biglyRequest(
        `/app/jobs/${id}/assign/${user.email}`,
        "POST",
        null,
      );

      if (status < 300) {
        toast.success(message);
        if (!job) return;

        const staff = job.staff;

        if (!staff.includes(data.user)) {
          staff.push(data.user);
        }

        job.staff = staff;
        setJob(job);
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

  const rejectItem = async (item_id: string) => {
    setLoading("posting");
    const {user} = globalState;

    try {
      const {status, message} = await biglyRequest(
        `/app/jobs/${id}/reject/${item_id}/${user.email}`,
        "PUT",
        null,
      );

      if (status < 300) {
        toast.success("Rejected Item");
        if (!job) return;

        const items = job.items.map((i) => {
          if (i.id == item_id) {
            return {
              ...i,
              has_error: true,
              staff_error: user.email,
              status: "rejected",
            } as Items;
          }
          return i;
        });

        job.items = items;
        setJob(job);
        setItem(
          (p) =>
            p && {
              ...p,
              has_error: true,
              staff_error: user.email,
              status: "rejected",
            },
        );
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

  const approveJob = async () => {
    setLoading("posting");
    try {
      const {status, data, message} = await biglyRequest(
        `/app/jobs/${id}`,
        "PUT",
        null,
      );

      if (status < 300) {
        toast.success("Approved Job");
        router.push(`/job/${id}`);
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

  const completeStation = async () => {
    setLoading("posting");
    setError(null);
    try {
      const {status, message} = await biglyRequest(
        `/app/jobs/${id}/complete`,
        "POST",
        null,
      );

      if (status < 300) {
        toast.success(message);
        router.refresh();
        setJob((p) => p && {...p, stage: findNextStage(p.stage)});
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

  return {
    loading,
    error,
    job,
    item,
    selectItem,
    setError,
    deleteJob,
    approveJob,
    assignStaff,
    rejectItem,
    removeItem,
    completeStation,
  };
};

export default useJob;
