"use client";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {createCurrentSeconds} from "../utils/converter.tsx/time";
import {SettingsPage, StoreDocument} from "../types/settings";
import {biglyRequest} from "../networking/biglyServer";
import {LoadingTypes, Staff} from "../types/shared";
import {handleHttpError} from "../utils/shared";
import {settings_data} from "../data/settings";
import {initialStaff} from "../payloads/staff";
import toast from "react-hot-toast";

interface SettingsReturn {
  data: SettingsPage;
  staff: Staff | null;
  error: string | null;
  loading: LoadingTypes;
  store: StoreDocument | null;
  createStaff: (staff: Staff) => Promise<void>;
  setStaff: Dispatch<SetStateAction<Staff | null>>;
  createStore: (store: StoreDocument) => Promise<void>;
  setStore: Dispatch<SetStateAction<StoreDocument | null>>;
  selectItem: (id: string, type: "store" | "staff") => void;
  deleteItem: (id: string, type: "store" | "staff") => Promise<void>;
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
      const {status, data, message} = await biglyRequest(
        "/app/settings",
        "GET",
        null,
      );
      console.log({settings: data});
      if (status < 300 && data) {
        toast.success("Fetched Data");
        setData((p) => ({
          ...p,
          staff: data.staff,
          store: data.stores,
        }));
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
    error,
    staff,
    store,
    loading,
    selectItem,
    deleteItem,
    createStaff,
    createStore,
    setStaff,
    setStore,
  };
};
