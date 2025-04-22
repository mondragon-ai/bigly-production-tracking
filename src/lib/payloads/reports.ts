import {
  BiglySalesGoals,
  CleanedAnalytics,
  ParsedBaseType,
  PasedReportData,
} from "../types/reports";
// import {getDaysInCurrentMonth} from "../utils/converter.tsx/time";

export const parseReportData = (
  analytics: CleanedAnalytics | null,
  goals: BiglySalesGoals | null,
): PasedReportData => {
  const payload = getBaseReportData();
  if (!analytics) return payload;
  const {comparison, yesterday} = analytics;

  console.log({comparison, yesterday});

  const base = parsedBase();

  return payload;
};

// Base Chart payload
export const getBaseReportData = (): PasedReportData => {
  return {
    daily_sales_goals: {
      churn: "0",
      stacked_chart: [],
    },
    monthly_sales_goals: {
      churn: "0",
      stacked_chart: [],
    },
    goals: {
      total_units: 0,
      completed_units: 0,
      total_jobs: 0,
      completed_jobs: 0,
    },
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

// Base Parsing Object
export const parsedBase = (): ParsedBaseType => {
  return {
    shopify: {
      ht: {
        gross_sales: 0,
        orders: 0,
        discounts: 0,
        returns: 0,
        total_sales: 0,
        shipping_charges: 0,
      },
      sc: {
        gross_sales: 0,
        orders: 0,
        discounts: 0,
        returns: 0,
        total_sales: 0,
        shipping_charges: 0,
      },
      aj: {
        gross_sales: 0,
        orders: 0,
        discounts: 0,
        returns: 0,
        total_sales: 0,
        shipping_charges: 0,
      },
      ajn: {
        gross_sales: 0,
        orders: 0,
        discounts: 0,
        returns: 0,
        total_sales: 0,
        shipping_charges: 0,
      },
      raj: {
        gross_sales: 0,
        orders: 0,
        discounts: 0,
        returns: 0,
        total_sales: 0,
        shipping_charges: 0,
      },
      oh: {
        gross_sales: 0,
        orders: 0,
        discounts: 0,
        returns: 0,
        total_sales: 0,
        shipping_charges: 0,
      },
      dmo: {
        gross_sales: 0,
        orders: 0,
        discounts: 0,
        returns: 0,
        total_sales: 0,
        shipping_charges: 0,
      },
      htl: {
        gross_sales: 0,
        orders: 0,
        discounts: 0,
        returns: 0,
        total_sales: 0,
        shipping_charges: 0,
      },
      pod: {
        gross_sales: 0,
        orders: 0,
        discounts: 0,
        returns: 0,
        total_sales: 0,
        shipping_charges: 0,
      },
    },
    stripe: {
      ht: {
        unsubscribed: 0,
        subscribed: 0,
      },
      sc: {
        unsubscribed: 0,
        subscribed: 0,
      },
      aj: {
        unsubscribed: 0,
        subscribed: 0,
      },
    },
    recharge: {
      ht: {
        unsubscribed: 0,
        subscribed: 0,
      },
      sc: {
        unsubscribed: 0,
        subscribed: 0,
      },
      aj: {
        unsubscribed: 0,
        subscribed: 0,
      },
      oh: {
        unsubscribed: 0,
        subscribed: 0,
      },
    },
    klaviyo: {
      ht: {
        campaing_count: 0,
        click_rate: 0,
        open_rate: 0,
        conversion_rate: 0,
        recipients: 0,
        conversion_value: 0,
        unsubscribed: 0,
        subscribed: 0,
      },
      sc: {
        campaing_count: 0,
        click_rate: 0,
        open_rate: 0,
        conversion_rate: 0,
        recipients: 0,
        conversion_value: 0,
        unsubscribed: 0,
        subscribed: 0,
      },
      aj: {
        campaing_count: 0,
        click_rate: 0,
        open_rate: 0,
        conversion_rate: 0,
        recipients: 0,
        conversion_value: 0,
        unsubscribed: 0,
        subscribed: 0,
      },
      oh: {
        campaing_count: 0,
        click_rate: 0,
        open_rate: 0,
        conversion_rate: 0,
        recipients: 0,
        conversion_value: 0,
        unsubscribed: 0,
        subscribed: 0,
      },
    },
  };
};
