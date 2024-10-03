import {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import {Items, JobDocument, Stages} from "@/lib/types/jobs";
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
  handleCreateItem: () => void;
  handleSelectItem: () => void;
};

export const useJobCreate: UseJobCreateProps = () => {
  const [job, setJob] = useState<JobDocument>(initialJobs());
  const [stores, setStores] = useState<StoreDocument[]>(store_list);
  const [loading, setLoading] = useState<LoadingTypes>(null);

  const handleApproveJob = useCallback(() => {
    // logic to approve the job with the given jobState, e.g., API request
    console.log(`READY TO APPROVE JOB with state`);
  }, []);

  const handleCreateItem = useCallback(() => {
    // setJobItems((prevItems) => [...prevItems, item]);
    // logic to create an item and append to job item list, e.g., API call
    console.log("READY TO CREATE ITEM:");
  }, []);

  const handleSelectItem = useCallback(() => {
    // logic to select an item and add it to the job item list state
    console.log("ITEM SELECTED:");
  }, []);

  const fetchStores = () => {
    setLoading("loading");
    try {
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
