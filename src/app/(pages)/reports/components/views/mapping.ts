export const allHeader = [
  {name: "Store Name", key: "store"},
  {name: "Metric", key: "metric_name"},
  {name: "Value", key: "value"},
  {name: "Product", key: "product_name"},
  {name: "Platform", key: "platform"},
  {name: "Date", key: "date"},
];

export const allVisOptions = [
  "Total Count",
  "Subscribed",
  "Unsubscribed",
  "Net Gain",
  "Churn Rate",
  "Total Sales",
  "Orders",
  "Average Order Value",
  "Returns",
  "Discounts",
  "Conversion Value",
  "Open Rate",
  "Click Rate",
];

export const subVisOptions = [
  "Total Count",
  "Subscribed",
  "Unsubscribed",
  "Net Gain",
  "Churn Rate",
];

export const mktVisOptions = [
  "Total Count",
  "Conversion Value",
  "Average Order Value",
  "Open Rate",
  "Click Rate",
];
export const shopVisOptions = [
  "Total Sales",
  "Orders",
  "Average Order Value",
  "Returns",
  "Discounts",
];

const metricsMapping: Record<string, string[]> = {
  All: allVisOptions,
  Shopify: shopVisOptions,
  Recharge: subVisOptions,
  Stripe: subVisOptions,
  Klaviyo: mktVisOptions,
};

export const getMetricsByPlatform = (platform: string) =>
  metricsMapping[platform] || allVisOptions;
