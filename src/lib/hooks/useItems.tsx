"use client";
import {useState, useEffect, useCallback} from "react";
import {biglyRequest} from "../networking/biglyServer";
import {handleHttpError} from "../utils/shared";
import {LoadingTypes} from "../types/shared";
import {Items} from "../types/jobs";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  // const seconds = createCurrentSeconds();
  const fetchItems = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        "/app/items",
        "GET",
        null,
      );

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
