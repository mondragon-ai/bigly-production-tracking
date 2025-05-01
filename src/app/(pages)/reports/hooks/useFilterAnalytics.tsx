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
import {allVisOptions, shopVisOptions} from "../components/views/mapping";

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
  const [total, setTotal] = useState<number>(0);

  const vizRef = useRef(null);
  const metricsRef = useRef(null);
  useEffect(() => {
    if (
      vizRef.current !== visualizationMetrics ||
      metricsRef.current !== metrics
    ) {
      vizRef.current == visualizationMetrics;
      metricsRef.current == metrics;
      const cleaned = cleanAnalyticsByPlatform(
        analytics,
        platform,
        visualizationMetrics,
        metrics,
      );
      setRow(cleaned.rows);
      setData(cleaned.chartData);
      setTotal(cleaned.total);
      if (platform === "Shopify") {
        if (metricsRef.current === metrics) setMetrics(shopVisOptions);
      }
    }
    if (platform === "All") {
      setMetrics(allVisOptions);
      setVisualizationMetrics([]);
    }
  }, [analytics, platform, type, visualizationMetrics, metrics]);

  return {
    row,
    data,
    total,
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
  visualizationMetrics: Metric[],
  metrics: string[],
): {
  rows: any[];
  chartData: {date: string; value: number}[];
  total: number;
} => {
  switch (platform) {
    case "Shopify":
      const rows = extractShopifyMetrics(analytics, metrics);
      const {total, chart} = buildShopifyChart(rows, visualizationMetrics);
      return {
        rows,
        chartData: chart,
        total: total,
      };
    case "All":
      return {
        rows: analytics,
        chartData: [],
        total: 0,
      };
    default:
      return {
        rows: [],
        chartData: [],
        total: 0,
      };
  }
};
