import {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import {ImageFiles, Items, JobDocument, Stages} from "@/lib/types/jobs";
import {initialJobs} from "../payloads/jobs";
import {LoadingTypes} from "../types/shared";
import {StoreDocument} from "../types/settings";
import {store_list} from "../data/settings";

type UseJobCreateProps = () => {
  job: JobDocument;
  stores: StoreDocument[];
  loading: LoadingTypes;
  setJob: Dispatch<SetStateAction<JobDocument>>;
  handleApproveJob: () => void;
  handleCreateItem: (item: Items, images: ImageFiles) => void;
  handleSelectItem: (item: Items) => void;
};

export const useJobCreate: UseJobCreateProps = () => {
  const [job, setJob] = useState<JobDocument>(initialJobs());
  const [stores, setStores] = useState<StoreDocument[]>([]);
  const [loading, setLoading] = useState<LoadingTypes>(null);

  const handleApproveJob = useCallback(() => {
    // logic to approve the job with the given jobState, e.g., API request
    console.log(`READY TO APPROVE JOB with state`);
  }, []);

  const handleCreateItem = useCallback(
    (item: Items, images: ImageFiles) => {
      console.log("READY TO CREATE ITEM:", item, images);
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

  const fetchStores = () => {
    setLoading("loading");
    try {
      setStores(store_list);
    } catch (error) {
      console.error("Error fetching stores: ", error);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return {
    job,
    loading,
    stores,
    setJob,
    handleApproveJob,
    handleCreateItem,
    handleSelectItem,
  };
};
