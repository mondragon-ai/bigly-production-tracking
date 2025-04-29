const allHeader = [
  {name: "Store Name", key: "store"},
  {name: "Metric", key: "metric_name"},
  {name: "Value", key: "value"},
  {name: "Product", key: "product_name"},
  {name: "Platform", key: "platform"},
  {name: "Date", key: "date"},
];

const subHeader = [
  {name: "Product Name", key: "product_name"},
  {name: "Total Count", key: "totalCount"},
  {name: "Created", key: "created"},
  {name: "Cancelled", key: "cancelled"},
  {name: "Net Gain", key: "net"},
  {name: "Churn Rate", key: "churnRate"},
  {name: "Date", key: "date"},
];

const shopHeaders = [
  {name: "Store", key: "store"},
  {name: "Orders", key: "orders"},
  {name: "AOV", key: "aov"},
  {name: "Total Sales", key: "total_sales"},
  {name: "Returns", key: "returns"},
  {name: "Discounts", key: "discounts"},
  {name: "Date", key: "date"},
];

const mktHeaders = [
  {name: "Store", key: "store"},
  {name: "Total Count", key: "totalCount"},
  {name: "Subscribed", key: "subscribed"},
  {name: "Unsubscribed", key: "unsubscribed"},
  {name: "Conversion Value", key: "conversion_value"},
  {name: "Average Order Value", key: "average_order_value"},
  {name: "Open Rate", key: "open_rate"},
  {name: "Click Rate", key: "click_rate"},
  {name: "Date", key: "date"},
];

const headerMapping: Record<string, {name: string; key: string}[]> = {
  All: allHeader,
  Shopify: shopHeaders,
  Recharge: subHeader,
  Stripe: subHeader,
  Klaviyo: mktHeaders,
};

const allVisOptions = [
  "Total Count",
  "Subscribed",
  "Unsubscribed",
  "Net Gain",
  "Churn Rate",
  "Total Sales",
  "Orders",
  "Average Order Value",
  "Returns",
  "Conversion Value",
  "Open Rate",
  "Click Rate",
];

const subVisOptions = [
  "Total Count",
  "Subscribed",
  "Unsubscribed",
  "Net Gain",
  "Churn Rate",
];
const mktVisOptions = [
  "Total Count",
  "Conversion Value",
  "Average Order Value",
  "Open Rate",
  "Click Rate",
];
const shopVisOptions = [
  "Total Sales",
  "Orders",
  "Average Order Value",
  "Returns",
];

const metricsMapping: Record<string, string[]> = {
  All: allVisOptions,
  Shopify: shopVisOptions,
  Recharge: subVisOptions,
  Stripe: subVisOptions,
  Klaviyo: mktVisOptions,
};

export const getHeadersByPlatform = (platform: string) =>
  headerMapping[platform] || allHeader;
export const getMetricsByPlatform = (platform: string) =>
  metricsMapping[platform] || allVisOptions;
