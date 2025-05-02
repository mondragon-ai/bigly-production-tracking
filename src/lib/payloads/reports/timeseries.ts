import {Stores} from "@/lib/types/reports";
import {
  formatToMoney,
  formatWithCommas,
} from "@/lib/utils/converter.tsx/numbers";
import {formatTimestamp} from "@/lib/utils/converter.tsx/time";

export type DailyMetric = {
  store: Stores;
  platform: string;
  metric_name: string;
  value: number;
  product_name: string | null;
  date: {value: string};
  created_at: {value: string};
};

// ========================= GENERAL CHART =========================
export type OutputMetric = {
  store: string;
  date: string;
  [key: string]: any;
};

export type ChartMetric =
  | "orders"
  | "aov"
  | "total_sales"
  | "returns"
  | "discounts"
  | "totalCount"
  | "total_count"
  | "created"
  | "cancelled"
  | "net"
  | "churn"
  | "conversion_value"
  | "average_order_value"
  | "recipients"
  | "open_rate"
  | "click_rate";

const moneyMetrics = [
  "returns",
  "discounts",
  "conversion_value",
  "average_order_value",
  "total_sales",
];

const isPercentageMetrics = ["churn", "open_rate", "click_rate"];
const averageMetrics = [
  "average_order_value",
  "open_rate",
  "click_rate",
  "churn",
];
const lastValueOnlyMetrics = ["total_count", "recipients"];

const parseCurrency = (value: string = "0"): number =>
  Number(String(value).replace(/[$,]/g, "")) || 0;

type ChartResults = {
  chart: Record<string, string | number>[];
  total: number;
  stores: string[];
  isMoney: boolean;
  isPercentage: boolean;
};

export const buildChartData = (
  data: OutputMetric[],
  selectedMetric: string[],
  filteredStores: string[],
): ChartResults => {
  const metricMap: Record<string, ChartMetric> = {
    Orders: "orders",
    Returns: "returns",
    Discounts: "discounts",
    "Total Count": "total_count",
    "Conversion Value": "conversion_value",
    "Average Order Value": "average_order_value",
    "Churn Rate": "churn",
    "Open Rate": "open_rate",
    "Click Rate": "click_rate",
    "Net Gain": "net",
    Recipients: "recipients",
    Subscribed: "created",
    Unsubscribed: "cancelled",
  };

  const metricKey =
    Object.keys(metricMap).find((key) => selectedMetric.includes(key)) ??
    "total_sales";

  const byDate = new Map<string, Record<string, string | number>>();
  const stores = new Set<string>();
  let total = 0;
  let count = 0;

  const isMoney = moneyMetrics.includes(metricMap[metricKey] || "total_sales");
  const isPercentage = isPercentageMetrics.includes(
    metricMap[metricKey] || "total_sales",
  );
  const isAverage = averageMetrics.includes(
    metricMap[metricKey] || "total_sales",
  );
  const isLastOnly = lastValueOnlyMetrics.includes(
    metricMap[metricKey] || "total_sales",
  );

  for (const row of data) {
    const date = row.date;
    const store = row.store;
    if (!filteredStores.includes(store)) continue;

    const rawValue = parseCurrency(row[metricMap[metricKey] || "total_sales"]);

    total += rawValue;
    stores.add(store);

    if (!byDate.has(date)) {
      byDate.set(date, {date});
    }

    const existing = byDate.get(date)!;
    existing[store] = rawValue;
    count++;
  }

  const chart = Array.from(byDate.values());

  if (isLastOnly && chart.length > 0) {
    let lastTotal = 0;
    const lastRow = chart[chart.length - 1];
    for (const store of filteredStores) {
      if (lastRow[store] !== undefined) {
        lastTotal += Number(lastRow[store]);
      }
    }
    return {
      chart: chart,
      total: lastTotal,
      stores: Array.from(stores),
      isMoney,
      isPercentage,
    };
  }

  return {
    chart: Array.from(byDate.values()),
    total: isAverage ? total / count : total,
    stores: Array.from(stores),
    isMoney,
    isPercentage,
  };
};

// ========================= SHOPIFY ROW DATA =========================
export const extractShopifyMetrics = (
  rows: Record<string, any>[],
  metrics: string[],
): OutputMetric[] => {
  const grouped = new Map<string, any>();

  for (const row of rows) {
    if (row.platform?.toLowerCase() !== "shopify") continue;

    const key = `${row.store}-${row.date.value}`;
    const timestamp = formatTimestamp(
      new Date(row.date.value).getTime() / 1000,
    );

    const entry = grouped.get(key) ?? {store: row.store, date: timestamp};
    switch (row.metric_name) {
      case "orders":
        if (metrics.includes("Orders"))
          entry.orders = (entry.orders ?? 0) + row.value;
        break;
      case "aov":
        if (metrics.includes("Average Order Value"))
          entry.average_order_value =
            (entry.average_order_value ?? 0) + row.value;
        break;
      case "total_sales":
        if (metrics.includes("Total Sales"))
          entry.total_sales = (entry.total_sales ?? 0) + row.value;
        break;
      case "returns":
        if (metrics.includes("Returns"))
          entry.returns = (entry.returns ?? 0) + row.value;
        break;
      case "discounts":
        if (metrics.includes("Discounts"))
          entry.discounts = (entry.discounts ?? 0) + row.value;
        break;
    }

    grouped.set(key, entry);
  }

  return Array.from(grouped.values()).map((entry) => {
    const orders = entry.orders || 0;
    const total_sales = entry.total_sales || 0;
    return {
      ...entry,
      ...(orders && {orders: formatWithCommas(orders)}),
      ...(orders &&
        total_sales &&
        orders && {
          average_order_value: formatToMoney(total_sales / orders),
        }),
      ...(total_sales && {total_sales: formatToMoney(total_sales)}),
      ...(entry.returns && {returns: formatToMoney(entry.returns)}),
      ...(entry.discounts && {discounts: formatToMoney(entry.discounts)}),
    };
  });
};

// ========================= SUB ROW DATA =========================
export const extractSubMetrics = (
  rows: Record<string, any>[],
  metrics: string[],
  platform: "recharge" | "stripe",
): OutputMetric[] => {
  const grouped = new Map<string, Record<string, any>>();

  for (const row of rows) {
    if (row.platform?.toLowerCase() !== platform) continue;

    const key = `${row.store}-${row.date.value}`;
    const timestamp = formatTimestamp(
      new Date(row.date.value).getTime() / 1000,
    );

    const entry = grouped.get(key) ?? {store: row.store, date: timestamp};
    switch (row.metric_name) {
      case "total_count":
        if (metrics.includes("Total Count"))
          entry.total_count = (entry.total_count ?? 0) + row.value;
        break;
      case "created":
        if (metrics.includes("Subscribed"))
          entry.created = (entry.created ?? 0) + row.value;
        break;
      case "cancelled":
        if (metrics.includes("Unsubscribed"))
          entry.cancelled = (entry.cancelled ?? 0) + row.value;
        break;
    }

    grouped.set(key, entry);
  }

  return Array.from(grouped.values()).map((entry) => {
    const created = entry.created || 0;
    const cancelled = entry.cancelled || 0;
    const churn =
      created === 0 ? (cancelled > 0 ? 100 : 0) : (cancelled / created) * 100;
    const net = created - cancelled;

    return {
      ...entry,
      ...(entry.total_count && {
        total_count: formatWithCommas(entry.total_count),
      }),
      ...(created && {created: formatWithCommas(created)}),
      ...(cancelled && {cancelled: formatWithCommas(cancelled)}),
      net: formatWithCommas(net),
      churn: formatWithCommas(churn),
    };
  });
};

// ========================= KLAVIYO ROW DATA =========================
export const extractKlaviyoMetrics = (
  rows: Record<string, any>[],
  metrics: string[],
): OutputMetric[] => {
  const grouped = new Map<string, any>();

  for (const row of rows) {
    if (row.platform?.toLowerCase() !== "klaviyo") continue;

    const key = `${row.store}-${row.date.value}`;
    const timestamp = formatTimestamp(
      new Date(row.date.value).getTime() / 1000,
    );

    const entry = grouped.get(key) ?? {store: row.store, date: timestamp};
    const name = row.metric_name;

    if (name === "total_count" && metrics.includes("Total Count"))
      entry.total_count = (entry.total_count ?? 0) + row.value;
    if (name === "subscribed" && metrics.includes("Subscribed"))
      entry.created = (entry.created ?? 0) + row.value;
    if (name === "unsubscribed" && metrics.includes("Unsubscribed"))
      entry.cancelled = (entry.cancelled ?? 0) + row.value;
    if (
      name === "average_order_value" &&
      metrics.includes("Average Order Value")
    )
      entry.average_order_value = (entry.average_order_value ?? 0) + row.value;
    if (name === "conversion_value" && metrics.includes("Conversion Value"))
      entry.conversion_value = (entry.conversion_value ?? 0) + row.value;
    if (name === "open_rate" && metrics.includes("Open Rate"))
      entry.open_rate = (entry.open_rate ?? 0) + row.value;
    if (name === "click_rate" && metrics.includes("Click Rate"))
      entry.click_rate = (entry.click_rate ?? 0) + row.value;
    if (name === "churn" && metrics.includes("Churn Rate"))
      entry.churn = (entry.churn ?? 0) + row.value;
    if (name === "recipients" && metrics.includes("Recipients"))
      entry.recipients = (entry.recipients ?? 0) + row.value;

    grouped.set(key, entry);
  }

  return Array.from(grouped.values()).map((entry) => ({
    ...entry,
    ...(entry.total_count && {
      total_count: formatWithCommas(entry.total_count),
    }),
    ...(entry.created && {created: formatWithCommas(entry.created)}),
    ...(entry.cancelled && {cancelled: formatWithCommas(entry.cancelled)}),
    ...(entry.churn && {churn: formatWithCommas(entry.churn)}),
    ...(entry.recipients && {recipients: formatWithCommas(entry.recipients)}),
    ...(entry.open_rate && {
      open_rate: formatWithCommas(entry.open_rate * 100),
    }),
    ...(entry.click_rate && {
      click_rate: formatWithCommas(entry.click_rate * 100),
    }),
    ...(entry.conversion_value && {
      conversion_value: formatToMoney(entry.conversion_value),
    }),
    ...(entry.average_order_value && {
      average_order_value: formatToMoney(entry.average_order_value),
    }),
  }));
};
