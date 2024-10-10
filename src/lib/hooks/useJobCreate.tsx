import {
  useState,
  useCallback,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import {ImageFiles, Items, JobDocument} from "@/lib/types/jobs";
import {biglyRequest} from "../networking/biglyServer";
import {LoadingTypes, Staff} from "../types/shared";
import {StoreDocument} from "../types/settings";
import {handleHttpError} from "../utils/shared";
import {initialJobs} from "../payloads/jobs";
import toast from "react-hot-toast";
import {createItemPayload} from "../payloads/items";
import {useRouter} from "next/navigation";

type UseJobCreateProps = () => {
  staff: Staff[];
  job: JobDocument;
  loading: LoadingTypes;
  stores: StoreDocument[];
  handleApproveJob: (ids: string[]) => void;
  removeItem: (id: string) => void;
  handleSelectItem: (item: Items) => void;
  setJob: Dispatch<SetStateAction<JobDocument>>;
  handleCreateItem: (item: Items, images: ImageFiles) => void;
};

export const useJobCreate: UseJobCreateProps = () => {
  const router = useRouter();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [stores, setStores] = useState<StoreDocument[]>([]);
  const [job, setJob] = useState<JobDocument>(initialJobs());
  const [loading, setLoading] = useState<LoadingTypes>(null);

  const handleApproveJob = useCallback(
    async (ids: string[]) => {
      const users = staff.filter((s) => ids.includes(s.id));
      console.log("STAFF: ", users);
      job.staff = users;
      console.log("READY TO APPROVE JOB with state", job);
      setError(null);
      try {
        const {status, message} = await biglyRequest(
          `/app/jobs/create`,
          "POST",
          {job},
        );

        if (status < 300) {
          toast.success(message);
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
    },
    [job, stores, staff],
  );

  const handleCreateItem = useCallback(
    async (item: Items, images: ImageFiles) => {
      setError(null);
      try {
        const new_item = await createItemPayload(item, images);
        console.log({new_item});
        const {status, data, message} = await biglyRequest(
          `/app/items`,
          "POST",
          {item: new_item},
        );

        if (status < 300 && data) {
          toast.success(message);
          if (!job.items.includes(item)) {
            setJob((prev) => ({...prev, items: [...prev.items, data.item]}));
          }
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
    },
    [job, stores],
  );

  const handleSelectItem = useCallback(
    (item: Items) => {
      if (!job.items.includes(item)) {
        setJob((prev) => ({...prev, items: [...prev.items, item]}));
      }
    },
    [job, stores, staff],
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
