import {useState, useCallback, useEffect} from "react";
import {ImageFiles, Items, JobDocument} from "@/lib/types/jobs";
import {biglyRequest} from "../networking/biglyServer";
import {LoadingTypes, Staff} from "../types/shared";
import {StoreDocument} from "../types/settings";
import {handleHttpError} from "../utils/shared";
import {initialJobs} from "../payloads/jobs";
import toast from "react-hot-toast";

type UseJobCreateProps = () => {
  staff: Staff[];
  job: JobDocument;
  loading: LoadingTypes;
  stores: StoreDocument[];
  handleApproveJob: () => void;
  removeItem: (id: string) => void;
  handleSelectItem: (item: Items) => void;
  handleCreateItem: (item: Items, images: ImageFiles) => void;
};

export const useJobCreate: UseJobCreateProps = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [stores, setStores] = useState<StoreDocument[]>([]);
  const [job, setJob] = useState<JobDocument>(initialJobs());
  const [loading, setLoading] = useState<LoadingTypes>(null);

  const handleApproveJob = useCallback(() => {
    console.log("READY TO APPROVE JOB with state", job);
  }, [job, stores]);

  const handleCreateItem = useCallback(
    (item: Items, images: ImageFiles) => {
      console.log("READY TO CREATE ITEM:", item, images);
      // upload images -> imges w/ urls
      // assign images to item -> payload
      // create item

      if (!job.items.includes(item)) {
        setJob((prev) => ({...prev, items: [...prev.items, item]}));
      }
    },
    [job, stores],
  );

  const handleSelectItem = useCallback(
    (item: Items) => {
      if (!job.items.includes(item)) {
        setJob((prev) => ({...prev, items: [...prev.items, item]}));
      }
    },
    [job, stores],
  );

  const removeItem = async (id: string) => {
    setLoading("deleting");
    const new_list = job.items.filter((i) => i.id !== id);
    if (new_list) {
      setJob((p) => ({...p, items: new_list}));
    }
    setLoading(null);
  };

  const fetchStores = async () => {
    setLoading("loading");
    setError(null);

    try {
      const {status, data, message} = await biglyRequest(
        "/app/settings",
        "GET",
        null,
      );
      console.log({settings: data});

      if (status < 300 && data) {
        toast.success("Fetched Data");
        setStores(data.stores);
        setStaff(data.staff);
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
    fetchStores();
  }, []);

  return {
    job,
    staff,
    stores,
    loading,
    setJob,
    removeItem,
    handleApproveJob,
    handleCreateItem,
    handleSelectItem,
  };
};
