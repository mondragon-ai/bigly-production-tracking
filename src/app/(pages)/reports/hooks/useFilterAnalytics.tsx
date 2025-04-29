import {useState, useCallback} from "react";
import {CleanedAnalytics} from "@/lib/types/reports";

export type PlatformType =
  | "All"
  | "Shopify"
  | "Recharge"
  | "Stripe"
  | "Klaviyo";
export type Metric = string;

export const useFilterAnalytics = (analytics: any) => {
  const [platform, setPlatform] = useState<PlatformType>("All");
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [visualizationMetrics, setVisualizationMetrics] = useState<Metric[]>(
    [],
  );
  const [data, setData] = useState<CleanedAnalytics | null>(null);
  const [row, setRow] = useState<any[]>([]);

  const fetchAnalytics = useCallback(async () => {
    // placeholder
    try {
      // Example: fetch data based on selected platform and metrics
      // const res = await fetch(`/api/analytics?platform=${platform}&metrics=${metrics.join(",")}`);
      // const data = await res.json();
      // setData(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  }, [platform, metrics]);

  return {
    row,
    data,
    platform,
    metrics,
    visualizationMetrics,
    setMetrics,
    setPlatform,
    setVisualizationMetrics,
  };
};
