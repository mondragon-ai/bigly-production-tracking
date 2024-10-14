"use client";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {LoadingTypes} from "../types/shared";
import {useGlobalContext} from "../store/context";
import {biglyRequest} from "../networking/biglyServer";
import {ProductionAnalyticsType, TimeFrameTypes} from "../types/analytics";
import {handleHttpError} from "@/app/shared";

interface AnalyticsReturn {
  loading: LoadingTypes;
  error: string | null;
  analytics: ProductionAnalyticsType[] | null;
  fetchTimeframe: (t: TimeFrameTypes) => Promise<void>;
}

export const useAnalytics = (): AnalyticsReturn => {
  const {globalState} = useGlobalContext();
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

      console.log(status, data, message);

      if (status < 300 && data) {
        toast.success(message);
        setAnalytics(data.analytics);
        return;
      } else {
        handleHttpError(status, `${message || ""}`, setError);
      }
    } catch (err) {
      handleHttpError(500, "Server Error", setError);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [globalState.user.jwt]);

  const fetchTimeframe = async (tf: TimeFrameTypes) => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        `/app/analytics/${tf}`,
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

  return {
    analytics,
    loading,
    error,
    fetchTimeframe,
  };
};
