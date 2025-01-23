import {} from "../types/analytics";
import {
  BiglyDailyReportDocument,
  KlaviyoStoreAnalytics,
  KlaviyoStoreNames,
  PasedReportData,
  RechargeAnalytics,
  ReportHeader,
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
  }

  console.log(payload.recharge);

  return payload;
};

const processSubscriptions = (
  s: Record<KlaviyoStoreNames, RechargeAnalytics>,
) => {
  let churn = 0;
  const stacked_chart: StackChartProps[] = [];

  for (const [name, value] of Object.entries(s)) {
    if (value && typeof value === "object") {
      stacked_chart.push({
        name,
        unsubscribed: value.cancelled || 0,
        subscription: value.created || 0,
      });
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  return {
    churn,
    stacked_chart,
  };
};

const processKlaviyo = (
  kl: Record<KlaviyoStoreNames, KlaviyoStoreAnalytics>,
) => {
  return {};
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
      churn: 0,
      stacked_chart: [],
    },
    stripe: {
      churn: 0,
      stacked_chart: [],
    },
    emails: {
      churn: 0,
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
