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
  const [chartConfig, setChartConfig] = useState<{
    isMoney: boolean;
    isPercentage: boolean;
  }>({
    isMoney: false,
    isPercentage: false,
  });

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
    setChartConfig({
      isMoney: cleaned.isMoney,
      isPercentage: cleaned.isPercentage,
    });
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
    chartConfig,
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
  isMoney: boolean;
  isPercentage: boolean;
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
      const {total, chart, stores, isMoney, isPercentage} = buildChartData(
        rows,
        visualizationMetrics,
        filteredStores,
      );
      return {rows, chartData: chart, total, stores, isMoney, isPercentage};
    }
    case "Recharge": {
      const rows = extractSubMetrics(analytics, metrics, "recharge");
      const {total, chart, stores, isMoney, isPercentage} = buildChartData(
        rows,
        visualizationMetrics,
        filteredStores,
      );
      return {rows, chartData: chart, total, stores, isMoney, isPercentage};
    }
    case "Stripe": {
      const rows = extractSubMetrics(analytics, metrics, "stripe");
      const {total, chart, stores, isMoney, isPercentage} = buildChartData(
        rows,
        visualizationMetrics,
        filteredStores,
      );
      return {rows, chartData: chart, total, stores, isMoney, isPercentage};
    }
    case "Klaviyo": {
      const rows = extractKlaviyoMetrics(analytics, metrics);
      const {total, chart, stores, isMoney, isPercentage} = buildChartData(
        rows,
        visualizationMetrics,
        filteredStores,
      );
      return {rows, chartData: chart, total, stores, isMoney, isPercentage};
    }
    default:
      return {
        rows: analytics,
        chartData: [],
        total: 0,
        stores: [],
        isMoney: false,
        isPercentage: false,
      };
  }
};
