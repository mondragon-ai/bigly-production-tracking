"use client";
import {useState, useEffect, useCallback} from "react";
import {LoadingTypes} from "../types/shared";
import {Items} from "../types/jobs";
import {item_list} from "../data/jobs";

interface ItemReturn {
  items: Items[];
  item: Items | null;
  loading: LoadingTypes;
  error: string | null;
  deleteItem: (id: string) => void;
  handleSelectItem: (id: string) => void;
}

const useItems = (): ItemReturn => {
  const [items, setItems] = useState<Items[]>([]);
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
      setItems(item_list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSelectItem = useCallback(
    (id: string) => {
      const item = items.find((i) => i.id == id);
      if (item) setItem(item);
    },
    [items],
  );

  const deleteItem = useCallback(
    (id: string) => {
      const new_items = items.filter((i) => i.id !== id);
      if (new_items) setItems(new_items);
      setItem(null);
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
