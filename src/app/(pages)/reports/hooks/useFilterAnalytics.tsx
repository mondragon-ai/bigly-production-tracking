import {useState, use, useEffect, useRef} from "react";
import {Stores} from "@/lib/types/reports";
import {Platform} from "algoliasearch";
import {
  formatToMoney,
  formatWithCommas,
} from "@/lib/utils/converter.tsx/numbers";
import {formatTimestamp} from "@/lib/utils/converter.tsx/time";
import {
  buildShopifyChart,
  extractShopifyMetrics,
} from "@/lib/payloads/reports/timeseries";
import {allVisOptions} from "../components/views/mapping";

type ViewTypes = "table" | "time" | "chart";
export type PlatformType =
  | "All"
  | "Shopify"
  | "Recharge"
  | "Stripe"
  | "Klaviyo";
export type Metric = string;

export const useFilterAnalytics = (
  analytics: Record<string, any>[],
  type: ViewTypes,
) => {
  const [platform, setPlatform] = useState<PlatformType>("All");
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [visualizationMetrics, setVisualizationMetrics] = useState<Metric[]>(
    [],
  );
  const [data, setData] = useState<{date: string; value: number}[]>([]);
  const [row, setRow] = useState<any[]>([]);

  const vizRef = useRef(null);
  useEffect(() => {
    if (vizRef.current !== visualizationMetrics) {
      vizRef.current == visualizationMetrics;
      const cleaned = cleanAnalyticsByPlatform(
        analytics,
        platform,
        visualizationMetrics,
      );
      setRow(cleaned.rows);
      setData(cleaned.chartData);
    }
    if (platform === "All") {
      setMetrics(allVisOptions);
      setVisualizationMetrics([]);
    }
  }, [analytics, platform, type, visualizationMetrics]);

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

const cleanAnalyticsByPlatform = (
  analytics: Record<string, any>[],
  platform: PlatformType,
  metric: Metric[],
): {
  rows: any[];
  chartData: {date: string; value: number}[];
} => {
  switch (platform) {
    case "Shopify":
      const rows = extractShopifyMetrics(analytics);
      return {
        rows,
        chartData: buildShopifyChart(rows, metric),
      };
    case "All":
      return {
        rows: analytics,
        chartData: [],
      };
    default:
      return {
        rows: [],
        chartData: [],
      };
  }
};
