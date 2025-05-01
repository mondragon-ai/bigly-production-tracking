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
  const [data, setData] = useState<Record<string, string | number>[]>([]);
  const [row, setRow] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [stores, setStores] = useState<string[]>([]);
  const [filteredStores, setFilteredStores] = useState<string[]>([]);

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
      filteredStores,
    );
    setRow(cleaned.rows);
    setData(cleaned.chartData);
    setTotal(cleaned.total);
    setStores(cleaned.stores);
  }, [analytics, platform, visualizationMetrics, metrics, filteredStores]);

  return {
    row,
    data,
    stores,
    total,
    platform,
    metrics,
    filteredStores,
    visualizationMetrics,
    setMetrics,
    setPlatform,
    setFilteredStores,
    setVisualizationMetrics,
    handleApplyChanges,
  };
};

type CleanedAnalyticsReturn = {
  rows: any[];
  chartData: Record<string, string | number>[];
  total: number;
  stores: string[];
};
const cleanAnalyticsByPlatform = (
  analytics: Record<string, any>[],
  platform: PlatformType,
  visualizationMetrics: Metric[],
  metrics: string[],
  filteredStores: string[],
): CleanedAnalyticsReturn => {
  switch (platform) {
    case "Shopify": {
      const rows = extractShopifyMetrics(analytics, metrics);
      const {total, chart, stores} = buildChartData(
        rows,
        visualizationMetrics,
        filteredStores,
      );
      return {rows, chartData: chart, total, stores};
    }
    case "Recharge": {
      const rows = extractSubMetrics(analytics, metrics, "recharge");
      const {total, chart, stores} = buildChartData(
        rows,
        visualizationMetrics,
        filteredStores,
      );
      return {rows, chartData: chart, total, stores};
    }
    case "Stripe": {
      const rows = extractSubMetrics(analytics, metrics, "stripe");
      const {total, chart, stores} = buildChartData(
        rows,
        visualizationMetrics,
        filteredStores,
      );
      return {rows, chartData: chart, total, stores};
    }
    case "Klaviyo": {
      const rows = extractKlaviyoMetrics(analytics, metrics);
      const {total, chart, stores} = buildChartData(
        rows,
        visualizationMetrics,
        filteredStores,
      );
      return {rows, chartData: chart, total, stores};
    }
    default:
      return {rows: analytics, chartData: [], total: 0, stores: []};
  }
};
