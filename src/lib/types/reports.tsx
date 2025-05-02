import {HeaderAnalytics, NameValueProps} from "./analytics";

export type PasedReportData = {
  header: HeaderAnalytics;
  gross_sales: BarChart;
  discounts: BarChart;
  orders: BarChart;
  returns: BarChart;
  total_sales: BarChart;
  shipping_charges: BarChart;
  stripe: SubscriptionReport;
  recharge: SubscriptionReport;
  emails: SubscriptionReport;
  conversion_value: BarChart;
  open_rate: BarChart;
  click_rate: BarChart;
  recipients: BarChart;
  products: BarChart;
  average_order_value: BarChart;
  monthly_sales_goals: SalesGoals;
  daily_sales_goals: SalesGoals;
};

export type SalesGoals = {
  churn: string;
  stacked_chart: {
    name: string;
    sales: number;
    goal: number;
  }[];
};

export type SubscriptionReport = {
  churn: string;
  stacked_chart: StackChartProps[];
};

export type StackChartProps = {
  name: string;
  unsubscribed: number;
  subscription: number;
};

export type BarChart = {
  sum?: number;
  bar_chart: NameValueProps[];
};

export type ReportHeader = {
  stripe: number;
  recharge: number;
};

export type KlaviyoStoreAnalytics = {
  average_order_value: number;
  churn?: number;
  click_rate: number;
  conversion_rate?: number;
  conversion_value: number;
  open_rate: number;
  recipients: number;
  subscribed: number;
  unsubscribed: number;
  total_count: number;
};

export type KlaviyoCampaignStatistics = {
  average_order_value: number;
  revenue_per_recipient: number;
  recipients: number;
  conversion_rate: number;
  conversion_value: number;
  open_rate: number;
  click_rate: number;
  unsubscribe_rate: number;
  bounce_rate: number;
  spam_complaint_rate: number;
};

export type StripeAnalytics = {
  created: number;
  cancelled: number;
  churn: number;
  total_count: number;
};

export type RechargeAnalytics = {
  created: number;
  cancelled: number;
  churn: number;
  total_count: number;
};

export type ShopifyAnalytics = {
  orders: number;
  conversion_rate: number;
  gross_sales: number;
  discounts: number;
  returns: number;
  net_sales: number;
  shipping_charges: number;
  taxes: number;
  total_sales: number;
};

export type Platforms = "shopify" | "klaviyo" | "recharge" | "stripe";
export type KlaviyoStoreNames = "ht" | "oh" | "sc" | "aj";
export type ShopifyStoreNames = "shophodgetwins" | "optimalhuman" | "bigly-pod";

export type BiglyDailyReportDocument = {
  klaviyo: KlaviyoStoreAnalytics;
  shopify: ShopifyAnalytics;
  recharge: Record<string, RechargeAnalytics>;
  stripe: StripeAnalytics;
};

export type Stores =
  | "shophodgetwins"
  | "ba47ec-2"
  | "d0c050-47"
  | "p0qzen-9g"
  | "1b0aa4-a0"
  | "optimalhuman"
  | "bigly-pod"
  | "690ebd-37"
  | "patrioticcoins"
  | "ht"
  | "sc"
  | "oh"
  | "aj";

export type CleanedAnalytics = {
  comparison: Record<Stores, BiglyDailyReportDocument>;
  yesterday: Record<Stores, BiglyDailyReportDocument>;
};

type SalesMetrics = {
  gross_sales: number;
  orders: number;
  discounts: number;
  returns: number;
  total_sales: number;
  shipping_charges: number;
};

type SubscriptionMetrics = {
  unsubscribed: number;
  subscribed: number;
};

type KlaviyoMetrics = {
  campaing_count: number;
  click_rate: number;
  open_rate: number;
  conversion_rate: number;
  recipients: number;
  conversion_value: number;
  unsubscribed: number;
  subscribed: number;
};

type ShopifyMetrics = {
  ht: SalesMetrics;
  sc: SalesMetrics;
  aj: SalesMetrics;
  ajn: SalesMetrics;
  raj: SalesMetrics;
  oh: SalesMetrics;
  dmo: SalesMetrics;
  htl: SalesMetrics;
  pod: SalesMetrics;
};

type StripeRechargeMetrics = {
  ht: SubscriptionMetrics;
  sc: SubscriptionMetrics;
  aj: SubscriptionMetrics;
  oh?: SubscriptionMetrics;
};

type KlaviyoRechargeMetrics = {
  ht: KlaviyoMetrics;
  sc: KlaviyoMetrics;
  aj: KlaviyoMetrics;
  oh: KlaviyoMetrics;
};

export type ParsedBaseType = {
  shopify: ShopifyMetrics;
  stripe: StripeRechargeMetrics;
  recharge: StripeRechargeMetrics;
  klaviyo: KlaviyoRechargeMetrics;
};

export type BiglySalesGoals = {
  ht: number;
  sc: number;
  aj: number;
  ajn: number;
  raj: number;
  oh: number;
  dmo: number;
  htl: number;
  pod: number;
  annual: number;
  sum: Record<
    string,
    {
      total: number;
      sales: Record<string, number>;
    }
  >;
  ytd: number;
};
