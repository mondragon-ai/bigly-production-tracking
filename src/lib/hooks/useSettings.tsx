"use client";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {LoadingTypes, Staff} from "../types/shared";
import {SettingsPage, StoreDocument} from "../types/settings";
import {settings_data} from "../data/settings";
import {delay, handleHttpError} from "../utils/shared";
import toast from "react-hot-toast";
import {SERVER_URL} from "../constants";
import {createCurrentSeconds} from "../utils/time";
import {biglyRequest} from "../networking/biglyServer";
import {initialStaff} from "../payloads/staff";

interface SettingsReturn {
  loading: LoadingTypes;
  error: string | null;
  selectItem: (id: string, type: "store" | "staff") => void;
  deleteItem: (id: string, type: "store" | "staff") => Promise<void>;
  createStaff: (staff: Staff) => Promise<void>;
  createStore: (store: StoreDocument) => Promise<void>;
  data: SettingsPage;
  staff: Staff | null;
  store: StoreDocument | null;
  setStaff: Dispatch<SetStateAction<Staff | null>>;
  setStore: Dispatch<SetStateAction<StoreDocument | null>>;
}

export const useSettings = (): SettingsReturn => {
  const [data, setData] = useState<SettingsPage>(settings_data);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [store, setStore] = useState<StoreDocument | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  const seconds = createCurrentSeconds();
  const fetchSettings = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data} = await biglyRequest("/app/settings", "GET", null);
      console.log({settings: data});
      if (status < 300 && data) {
        toast.success("Fetched Data");
        setData((p) => ({
          ...p,
          staff: data.staff,
          store: data.stores,
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const selectItem = (id: string, type: "store" | "staff") => {
    if (type == "staff") {
      const selected = data.staff?.find((s) => s.id === id);
      if (selected) setStaff(selected);
    }
    if (type == "store") {
      const selected = data.store?.find((s) => s.id === id);
      if (selected) setStore(selected);
    }
  };

  const deleteItem = async (id: string, type: "store" | "staff") => {
    setLoading("posting");
    setError(null);
    const url = type == "store" ? `/app/store/${id}` : `/auth/staff/${id}`;

    try {
      const {status, data: res} = await biglyRequest(url, "DELETE", null);

      if (status < 300) {
        toast.success("Deleted " + type);
        const new_list = data[type]?.filter((i) => i.id !== id);
        setData((p) => ({
          ...p,
          [type]: new_list,
        }));
        setStaff(initialStaff);

        return;
      } else {
        handleHttpError(status, res?.data.message, setError);
        return;
      }
    } catch (error: any) {
      handleHttpError(500, "Server Error.", setError);
      return;
    } finally {
      setLoading(null);
    }
  };

  const createStaff = async (staff: Staff) => {
    setLoading("posting");
    setError(null);
    console.log(staff);
    try {
      const {status, message} = await biglyRequest("/auth/create", "POST", {
        user: staff,
      });

      if (status < 300) {
        toast.success("Created Staff");
        setData((p) => ({
          ...p,
          staff: [
            ...(p.staff ? p.staff : []),
            {...staff, id: staff.email, created_at: seconds},
          ],
        }));
        return;
      } else {
        handleHttpError(status, `${message}`, setError);
        return;
      }
    } catch (error: any) {
      handleHttpError(500, "Server Error.", setError);
      return;
    } finally {
      setLoading(null);
    }
  };

  const createStore = async (store: StoreDocument) => {
    setLoading("posting");
    setError(null);
    console.log(store);
    try {
      const {status, message} = await biglyRequest("/app/store", "POST", {
        store: store,
      });

      if (status < 300) {
        toast.success("Created Store");
        setData((p) => ({
          ...p,
          store: [
            ...(p.store ? p.store : []),
            {...store, id: store.domain, created_at: seconds},
          ],
        }));
        return;
      } else {
        handleHttpError(status, `${message}`, setError);
        return;
      }
    } catch (error: any) {
      handleHttpError(500, "Server Error.", setError);
      return;
    } finally {
      setLoading(null);
    }
  };

  return {
    data,
    loading,
    error,
    selectItem,
    deleteItem,
    createStaff,
    createStore,
    setStaff,
    setStore,
    staff,
    store,
  };
};
