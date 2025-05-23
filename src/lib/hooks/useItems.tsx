"use client";
import {useState, useEffect, useCallback} from "react";
import {biglyRequest} from "../networking/biglyServer";
import {handleHttpError} from "@/app/shared";
import {LoadingTypes} from "../types/shared";
import {Items} from "../types/jobs";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface ItemReturn {
  items: Items[];
  item: Items | null;
  loading: LoadingTypes;
  error: string | null;
  deleteItem: (id: string) => void;
  handleSelectItem: (id: string) => void;
}

const useItems = (): ItemReturn => {
  const router = useRouter();
  const [items, setItems] = useState<Items[]>([]);
  const [item, setItem] = useState<Items | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>("loading");

  const fetchItems = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        "/app/items",
        "GET",
        null,
      );

      if (status == 401) {
        return router.push("/");
      }
      if (status == 403) {
        return router.push("/jobs");
      }

      if (status < 300 && data) {
        toast.success("Fetched Data");
        setItems(data.items);
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

  const handleSelectItem = useCallback(
    (id: string) => {
      const item = items.find((i) => i.id == id);
      if (item) setItem(item);
    },
    [items],
  );

  const deleteItem = useCallback(
    async (id: string) => {
      setError(null);
      try {
        const {status, message} = await biglyRequest(
          `/app/items/${id}`,
          "DELETE",
          null,
        );

        if (status == 401) {
          return router.push("/");
        }
        if (status == 403) {
          return router.push("/jobs");
        }

        if (status < 300) {
          toast.success("Deleted Item");
          const new_items = items.filter((i) => i.id !== id);
          if (new_items) setItems(new_items);
          setItem(null);
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
    [items],
  );

  return {
    loading,
    error,
    item,
    items,
    deleteItem,
    handleSelectItem,
  };
};

export default useItems;
