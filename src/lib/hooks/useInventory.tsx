"use client";
import {useState, useEffect, useCallback} from "react";
import {InventoryDocument} from "../types/inventory";
import {LoadingTypes} from "../types/shared";
import {handleHttpError} from "@/app/shared";
import {biglyRequest} from "../networking/biglyServer";
import toast from "react-hot-toast";

interface InventoryReturn {
  inventory: InventoryDocument[];
  item: InventoryDocument | null;
  loading: LoadingTypes;
  error: string | null;
  deleteItem: (id: string) => void;
  handleSelectItem: (id: string) => void;
}

const useInventory = (): InventoryReturn => {
  const [inventory, setInventory] = useState<InventoryDocument[]>([]);
  const [item, setItem] = useState<InventoryDocument | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        "/app/inventory",
        "GET",
        null,
      );

      if (status < 300 && data) {
        toast.success("Fetched Inventory");
        setInventory(data.inventory);
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
      const item = inventory.find((i) => i.id == id);
      if (item) setItem(item);
    },
    [inventory],
  );

  const deleteItem = useCallback(
    (id: string) => {
      const new_items = inventory.filter((i) => i.id !== id);
      if (new_items) setInventory(new_items);
      setItem(null);
    },
    [inventory],
  );

  return {
    loading,
    error,
    inventory,
    item,
    deleteItem,
    handleSelectItem,
  };
};

export default useInventory;
