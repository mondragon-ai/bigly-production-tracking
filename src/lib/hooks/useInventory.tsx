"use client";
import {useState, useEffect, useCallback} from "react";
import {InventoryDocument} from "../types/inventory";
import {invenroy_list} from "../data/inventory";
import {LoadingTypes} from "../types/shared";

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
  const [loading, setLoading] = useState<LoadingTypes>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = async () => {
    setLoading("loading");
    try {
      const delay = (s: number) => {
        return new Promise((resolve) => setTimeout(resolve, s));
      };
      await delay(1500);
      setInventory(invenroy_list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchInventory();
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
