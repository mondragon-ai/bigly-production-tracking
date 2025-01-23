import {NameValueProps} from "../types/analytics";
import {
  BiglyDailyReportDocument,
  KlaviyoStoreAnalytics,
  KlaviyoStoreNames,
  PasedReportData,
  RechargeAnalytics,
  ReportHeader,
  ShopifyAnalytics,
  ShopifyStoreNames,
  StackChartProps,
} from "../types/reports";

export const parseReportData = (
  analytics: BiglyDailyReportDocument[] | null,
): PasedReportData => {
  const payload = getBaseReportData();
  if (!analytics) return payload;

  for (const doc of analytics) {
    payload.stripe = processSubscriptions(doc.stripe);
    payload.recharge = processSubscriptions(doc.recharge);

    payload.gross_sales = processShopify(doc.shopify, "gross_sales");
    payload.orders = processShopify(doc.shopify, "orders");
    payload.discounts = processShopify(doc.shopify, "discounts");
    payload.returns = processShopify(doc.shopify, "returns");
    payload.total_sales = processShopify(doc.shopify, "total_sales");
    payload.shipping_charges = processShopify(doc.shopify, "shipping_charges");

    payload.click_rate = processKlaviyo(doc.klaviyo, "click_rate");
    payload.open_rate = processKlaviyo(doc.klaviyo, "open_rate");
    payload.conversion_rate = processKlaviyo(doc.klaviyo, "conversion_rate");

    payload.recipients = processKlaviyo(doc.klaviyo, "recipients", 1);
    payload.conversion_value = processKlaviyo(
      doc.klaviyo,
      "conversion_value",
      1,
    );
    payload.emails = processEmailSubscriptions(doc.klaviyo);
  }

  return payload;
};

const processEmailSubscriptions = (
  s: Record<KlaviyoStoreNames, KlaviyoStoreAnalytics>,
) => {
  const stacked_chart: StackChartProps[] = [];

  let unsubscribed = 0;
  let subscription = 0;
  for (const [name, value] of Object.entries(s)) {
    if (value && typeof value === "object") {
      stacked_chart.push({
        name,
        unsubscribed: value.count.unsubscribed || 0,
        subscription: value.count.subscribed || 0,
      });

      unsubscribed += value.count.unsubscribed;
      subscription += value.count.subscribed;
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  let churn = Number(Number(unsubscribed / (subscription || 1)) * 100).toFixed(
    2,
  );

  return {
    churn,
    stacked_chart,
  };
};

const processKlaviyo = (
  s: Record<KlaviyoStoreNames, KlaviyoStoreAnalytics>,
  v: string,
  m = 100,
) => {
  let sum = 0;
  let count = 0;
  const bar_chart: NameValueProps[] = [];

  for (const [name, value] of Object.entries(s)) {
    if (value && typeof value === "object") {
      if (!value["statistics"]) continue;
      const stats = value["statistics"];

      const d = stats.reduce((p, c) => {
        return p + c[v as keyof KlaviyoStoreAnalytics["statistics"]];
      }, 0);

      bar_chart.push({
        name,
        value: Math.abs(d) * m,
      });

      count++;
      sum += Math.abs(d) * m;
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  return {
    sum: sum / count,
    bar_chart: bar_chart,
  };
};

const processShopify = (
  s: Record<ShopifyStoreNames, ShopifyAnalytics>,
  v: string,
) => {
  let sum = 0;
  const bar_chart: NameValueProps[] = [];

  for (const [name, value] of Object.entries(s)) {
    if (value && typeof value === "object") {
      bar_chart.push({
        name,
        value: Math.abs(value[v as keyof ShopifyAnalytics]),
      });

      sum += Math.abs(value[v as keyof ShopifyAnalytics]);
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  return {
    sum: sum,
    bar_chart: bar_chart,
  };
};

const processSubscriptions = (
  s: Record<KlaviyoStoreNames, RechargeAnalytics>,
) => {
  const stacked_chart: StackChartProps[] = [];

  let unsubscribed = 0;
  let subscription = 0;
  for (const [name, value] of Object.entries(s)) {
    if (value && typeof value === "object") {
      stacked_chart.push({
        name,
        unsubscribed: value.cancelled || 0,
        subscription: value.created || 0,
      });

      unsubscribed += value.cancelled;
      subscription += value.created;
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  let churn = Number(Number(unsubscribed / (subscription || 1)) * 100).toFixed(
    2,
  );

  return {
    churn,
    stacked_chart,
  };
};

export const getBaseReportData = (): PasedReportData => {
  return {
    subscription_ratio: {
      stripe: 0,
      recharge: 0,
    } as ReportHeader,
    gross_sales: {
      sum: 0,
      bar_chart: [],
    },
    discounts: {
      sum: 0,
      bar_chart: [],
    },
    orders: {
      sum: 0,
      bar_chart: [],
    },
    returns: {
      sum: 0,
      bar_chart: [],
    },
    total_sales: {
      sum: 0,
      bar_chart: [],
    },
    shipping_charges: {
      sum: 0,
      bar_chart: [],
    },
    recharge: {
      churn: "0",
      stacked_chart: [],
    },
    stripe: {
      churn: "0",
      stacked_chart: [],
    },
    emails: {
      churn: "0",
      stacked_chart: [],
    },
    conversion_value: {
      sum: 0,
      bar_chart: [],
    },
    open_rate: {
      sum: 0,
      bar_chart: [],
    },
    click_rate: {
      sum: 0,
      bar_chart: [],
    },
    recipients: {
      sum: 0,
      bar_chart: [],
    },
    conversion_rate: {
      sum: 0,
      bar_chart: [],
    },
  };
};
