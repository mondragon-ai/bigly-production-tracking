"use client";
import toast from "react-hot-toast";
import {useCallback, useEffect, useState} from "react";
import {LoadingTypes} from "../types/shared";
import {biglyRequest} from "../networking/biglyServer";
import {TimeFrameTypes} from "../types/analytics";
import {handleHttpError} from "@/app/shared";
import {useRouter} from "next/navigation";
import {BiglySalesGoals, CleanedAnalytics} from "../types/reports";

interface AnalyticsReturn {
  rawRow: Record<string, any>[];
  loading: LoadingTypes;
  error: string | null;
  analytics: CleanedAnalytics | null;
  goals: BiglySalesGoals | null;
  fetchTimeframe: (t: TimeFrameTypes) => Promise<void>;
  saveGoals: (goals: BiglySalesGoals) => Promise<void>;
}

type ViewTypes = "table" | "time" | "chart";

export const useReports = (viewType: ViewTypes): AnalyticsReturn => {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<CleanedAnalytics | null>(null);
  const [rawRow, setRawRow] = useState<Record<string, any>[]>([]);
  const [goals, setGoals] = useState<BiglySalesGoals | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        "/bigly/report/yesterday",
        "GET",
        null,
      );

      if (status < 300 && data) {
        toast.success(message);
        setAnalytics(data);
        return;
      } else {
        return handleHttpError(status, `${message || ""}`, setError);
      }
    } catch (err) {
      console.log(err);
      handleHttpError(500, "Server Error", setError);
    } finally {
      setLoading(null);
    }
  };

  const fetchGoals = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        "/bigly/goals",
        "GET",
        null,
      );

      if (status < 300 && data) {
        toast.success(message);
        setGoals(data);
        return;
      } else {
        return handleHttpError(status, `${message || ""}`, setError);
      }
    } catch (err) {
      console.log(err);
      handleHttpError(500, "Server Error", setError);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    fetchGoals();
  }, []);

  const fetchTimeframe = useCallback(
    async (tf: TimeFrameTypes) => {
      setLoading("loading");
      setError(null);

      try {
        const {status, data, message} = await biglyRequest(
          `/bigly/report/${tf}?type=${viewType}`,
          "GET",
          null,
        );

        // if (status == 401) {
        //   return router.push("/");
        // }
        // if (status == 403) {
        //   return router.push("/jobs");
        // }

        if (status < 300 && data) {
          toast.success(message);
          if (viewType !== "time") {
            setAnalytics(data);
          } else {
            setRawRow(data.analytics);
          }
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
    },
    [viewType],
  );

  const saveGoals = async (goals: BiglySalesGoals) => {
    setLoading("loading");
    setError(null);

    try {
      const {status, data, message} = await biglyRequest(
        `/bigly/goals`,
        "POST",
        {
          ht: goals.ht,
          sc: goals.sc,
          aj: goals.aj,
          ajn: goals.ajn,
          raj: goals.raj,
          oh: goals.oh,
          dmo: goals.dmo,
          htl: goals.htl,
          pod: goals.pod,
          annual: goals.annual,
        },
      );

      // if (status == 401) {
      //   return router.push("/");
      // }
      // if (status == 403) {
      //   return router.push("/jobs");
      // }

      if (status < 300 && data) {
        toast.success(message);

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
    rawRow,
    goals,
    analytics,
    loading,
    error,
    fetchTimeframe,
    saveGoals,
  };
};
