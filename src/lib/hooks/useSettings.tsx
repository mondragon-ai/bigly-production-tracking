"use client";
import {useEffect, useState} from "react";
import {LoadingTypes, Staff} from "../types/shared";
import {SettingsPage, StoreDocument} from "../types/settings";
import {settings_data} from "../data/settings";

interface SettingsReturn {
  loading: LoadingTypes;
  error: string | null;
  selectItem: (id: string, type: "store" | "staff") => void;
  deleteItem: (id: string, type: "store" | "staff") => Promise<void>;
  addItem: (type: "store" | "staff") => void;
  createStaff: (staff: Staff) => Promise<void>;
  createStore: (store: StoreDocument) => Promise<void>;
  data: SettingsPage;
  staff: Staff | null;
  store: StoreDocument | null;
}

export const useSettings = (): SettingsReturn => {
  const [data, setData] = useState<SettingsPage>(settings_data);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [store, setStore] = useState<StoreDocument | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading("loading");
    try {
      //   const response = await fetch("/api/images");
      //   if (!response.ok) throw new Error("Failed to fetch images");
      //   const data: Image[] = await response.json();
      //   setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const selectItem = (id: string, type: "store" | "staff") => {
    setLoading("requesting");
    if (type == "staff") {
      const selected = data.staff.find((s) => s.id === id);
      if (selected) setStaff(selected);
    }
    if (type == "store") {
      const selected = data.store.find((s) => s.id === id);
      if (selected) setStore(selected);
    }
  };

  const deleteItem = async (id: string, type: "store" | "staff") => {
    setLoading("posting");
  };

  const addItem = (type: "store" | "staff") => {
    setLoading("posting");
  };

  const createStaff = async (staff: Staff) => {
    setLoading("posting");
  };
  const createStore = async (store: StoreDocument) => {
    setLoading("posting");
  };

  return {
    data,
    loading,
    error,
    selectItem,
    deleteItem,
    addItem,
    createStaff,
    createStore,
    staff,
    store,
  };
};
