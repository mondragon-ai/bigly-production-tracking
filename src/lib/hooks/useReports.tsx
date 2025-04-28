"use client";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {LoadingTypes} from "../types/shared";
// import {useGlobalContext} from "../store/context";
import {biglyRequest} from "../networking/biglyServer";
import {TimeFrameTypes} from "../types/analytics";
import {handleHttpError} from "@/app/shared";
import {useRouter} from "next/navigation";
import {
  BiglyDailyReportDocument,
  BiglySalesGoals,
  CleanedAnalytics,
} from "../types/reports";

interface AnalyticsReturn {
  loading: LoadingTypes;
  error: string | null;
  analytics: CleanedAnalytics | null;
  goals: BiglySalesGoals | null;
  fetchTimeframe: (t: TimeFrameTypes) => Promise<void>;
  saveGoals: (goals: BiglySalesGoals) => Promise<void>;
}

export const useReports = (): AnalyticsReturn => {
  const router = useRouter();
  // const {globalState} = useGlobalContext();
  const [analytics, setAnalytics] = useState<CleanedAnalytics | null>(null);
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

  const fetchTimeframe = async (tf: TimeFrameTypes) => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        `/bigly/report/${tf}`,
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
        console.log({data});
        toast.success(message);
        setAnalytics(data);
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
    goals,
    analytics,
    loading,
    error,
    fetchTimeframe,
    saveGoals,
  };
};
