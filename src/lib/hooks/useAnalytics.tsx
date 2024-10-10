"use client";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {LoadingTypes, Staff} from "../types/shared";
import {SettingsPage, StoreDocument} from "../types/settings";
import {settings_data} from "../data/settings";
import {delay, handleHttpError} from "../utils/shared";
import {biglyRequest} from "../networking/biglyServer";
import toast from "react-hot-toast";
import {ProductionAnalyticsType} from "../types/analytics";

interface AnalyticsReturn {
  loading: LoadingTypes;
  error: string | null;
  analytics: ProductionAnalyticsType[] | null;
}

export const useAnalytics = (): AnalyticsReturn => {
  const [analytics, setAnalytics] = useState<ProductionAnalyticsType[] | null>(
    null,
  );
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        "/app/analytics/today",
        "GET",
        null,
      );

      if (status < 300 && data) {
        console.log({data});
        toast.success(message);
        setAnalytics(data.analytics);
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
    fetchAnalytics();
  }, []);

  return {
    analytics,
    loading,
    error,
  };
};
