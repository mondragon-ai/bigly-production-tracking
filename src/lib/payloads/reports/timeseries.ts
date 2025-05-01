import {Stores} from "@/lib/types/reports";
import {
  formatToMoney,
  formatWithCommas,
} from "@/lib/utils/converter.tsx/numbers";
import {formatTimestamp} from "@/lib/utils/converter.tsx/time";
import {Platform} from "algoliasearch";

export type DailyMetric = {
  store: Stores;
  platform: Platform;
  metric_name: string;
  value: number;
  product_name: string | null;
  date: {value: string};
  created_at: {value: string};
};

type OutputMetric = {
  store: string;
  orders: string;
  aov: string;
  total_sales: string;
  returns: string;
  discounts: string;
  date: string;
  totalCount: string;
};
type ChartMetric =
  | "orders"
  | "aov"
  | "total_sales"
  | "returns"
  | "discounts"
  | "totalCount";

const parseCurrency = (value: string = "0"): number =>
  Number(String(value || "0").replace(/[$,]/g, "")) || 0;

// ========================= GENERAL CHART =========================
export const buildShopifyChart = (
  data: OutputMetric[],
  selectedMetric: string[],
): {chart: {date: string; value: number}[]; total: number} => {
  const metricMap: Record<string, ChartMetric> = {
    Count: "totalCount",
    Orders: "orders",
    Average: "aov",
    Returns: "returns",
    Discounts: "discounts",
  };

  const metricKey =
    Object.keys(metricMap).find((key) => {
      return selectedMetric.includes(key);
    }) ?? "total_sales";

  let total = 0;
  const chart = data.map((row) => {
    total += parseCurrency(row[metricMap[metricKey] || "total_sales"]);
    return {
      date: row.date,
      value: parseCurrency(row[metricMap[metricKey] || "total_sales"]),
    };
  });

  return {chart, total};
};

const METRICS = [
  "orders",
  "aov",
  "total_sales",
  "returns",
  "discounts",
] as const;
type MetricKey = (typeof METRICS)[number];

// ========================= SHOPIFY ROW DATA =========================
export const extractShopifyMetrics = (
  rows: Record<string, any>[],
  metrics: string[],
): OutputMetric[] => {
  const grouped = new Map<string, Record<string, any>>();

  for (const row of rows) {
    if (row.platform?.toLowerCase() !== "shopify") continue;

    const key = `${row.store}-${row.date.value}`;
    const seconds = new Date(row.date.value).getTime() / 1000;

    if (!grouped.has(key)) {
      grouped.set(key, {
        store: row.store,
        date: formatTimestamp(seconds),
      });
    }

    const entry = grouped.get(key)!;

    console.log(metrics);
    switch (row.metric_name) {
      case "orders":
        if (metrics.includes("Orders")) {
          entry.orders = 0;
          entry.orders += row.value;
          break;
        }
        break;
      case "aov":
        if (metrics.includes("Average Order Value")) {
          entry.aov = 0;
          entry.aov += row.value;
          break;
        }
        break;
      case "total_sales":
        if (metrics.includes("Total Sales")) {
          entry.total_sales = 0;
          entry.total_sales += row.value;

          break;
        }
        break;
      case "returns":
        if (metrics.includes("Returns")) {
          entry.returns = 0;
          entry.returns += row.value;

          break;
        }
        break;
      case "discounts":
        if (metrics.includes("Discounts")) {
          entry.discounts = 0;
          entry.discounts += row.value;

          break;
        }
        break;
    }
  }

  return Array.from(grouped.values()).map((entry) => {
    const orders = entry.orders || 0;
    const total_sales = entry.total_sales || 0;

    console.log(entry);
    return {
      ...entry,
      ...(orders && {orders: formatWithCommas(orders)}),
      ...(orders && {aov: formatToMoney(total_sales / orders)}),
      ...(total_sales && {total_sales: formatToMoney(total_sales)}),
      ...(entry.returns && {returns: formatWithCommas(entry.returns)}),
      ...(entry.discounts && {discounts: formatToMoney(entry.discounts)}),
    };
  });
};
