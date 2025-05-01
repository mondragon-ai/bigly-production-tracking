import {useState, use, useEffect, useRef, useCallback} from "react";
import {
  buildChartData,
  extractKlaviyoMetrics,
  extractShopifyMetrics,
  extractSubMetrics,
} from "@/lib/payloads/reports/timeseries";
import {
  allVisOptions,
  getMetricsByPlatform,
  mktVisOptions,
  shopVisOptions,
  subVisOptions,
} from "../components/views/mapping";

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

  useEffect(() => {
    if (type !== "time") return;
    setMetrics(getMetricsByPlatform(platform));
    setVisualizationMetrics([]);
  }, [analytics, platform, type]);

  const handleApplyChanges = useCallback(() => {
    const cleaned = cleanAnalyticsByPlatform(
      analytics,
      platform,
      visualizationMetrics,
      metrics,
    );
    setRow(cleaned.rows);
    setData(cleaned.chartData);
    setTotal(cleaned.total);
  }, [analytics, platform, visualizationMetrics, metrics]);

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
    handleApplyChanges,
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
    case "All": {
      return {
        rows: analytics,
        chartData: [],
        total: 0,
      };
    }
    case "Shopify": {
      const rows = extractShopifyMetrics(analytics, metrics);
      const {total, chart} = buildChartData(rows, visualizationMetrics);
      return {rows, chartData: chart, total};
    }
    case "Recharge": {
      const rows = extractSubMetrics(analytics, metrics, "recharge");
      const {total, chart} = buildChartData(rows, visualizationMetrics);
      return {rows, chartData: chart, total};
    }
    case "Stripe": {
      const rows = extractSubMetrics(analytics, metrics, "stripe");
      const {total, chart} = buildChartData(rows, visualizationMetrics);
      return {rows, chartData: chart, total};
    }
    case "Klaviyo": {
      const rows = extractKlaviyoMetrics(analytics, metrics);
      const {total, chart} = buildChartData(rows, visualizationMetrics);
      return {rows, chartData: chart, total};
    }
    default:
      return {rows: analytics, chartData: [], total: 0};
  }
};
