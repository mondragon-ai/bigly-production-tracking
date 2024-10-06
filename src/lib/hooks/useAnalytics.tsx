"use client";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {LoadingTypes, Staff} from "../types/shared";
import {SettingsPage, StoreDocument} from "../types/settings";
import {settings_data} from "../data/settings";
import {delay} from "../utils/shared";

interface AnalyticsReturn {
  loading: LoadingTypes;
  error: string | null;
  analytics: any;
}

export const useAnalytics = (): AnalyticsReturn => {
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading("loading");
    try {
      await delay(1500);
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
    fetchAnalytics();
  }, []);

  return {
    analytics,
    loading,
    error,
  };
};
