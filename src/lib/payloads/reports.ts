import {HeaderAnalytics} from "../types/analytics";
import {
  BiglyDailyReportDocument,
  BiglySalesGoals,
  CleanedAnalytics,
  ParsedBaseType,
  PasedReportData,
  Stores,
} from "../types/reports";
import {getDaysInCurrentMonth} from "../utils/converter.tsx/time";

type Yesterday = Record<Stores, BiglyDailyReportDocument>;

// ============================ Parse Analytics/Goal Data ============================
export const parseReportData = (
  analytics: CleanedAnalytics | null,
  goals: BiglySalesGoals | null,
): PasedReportData => {
  if (!analytics) return getBaseReportData();

  const {yesterday} = analytics;

  return {
    ...getBaseReportData(),
    daily_sales_goals: buildDailySalesGoals(yesterday, goals),
    monthly_sales_goals: buildMonthlySalesGoals(goals),
    header: buildHeaderSalesGoals(goals!),
    gross_sales: buildGrossSales(yesterday),
  };
};

// ============================ Goal Charts ============================
const buildDailySalesGoals = (
  data: CleanedAnalytics["comparison"],
  goals: BiglySalesGoals | null,
) => {
  if (!goals || !data) return emptyStackedChart();

  const daysInMonth = getDaysInCurrentMonth();
  const result = Object.entries(data).reduce<{
    churn: number;
    stacked_chart: {name: string; sales: number; goal: number}[];
  }>(
    (acc, [store, metrics]) => {
      if (metrics?.shopify) {
        const sales = Math.abs(metrics.shopify.total_sales);
        const goal = Math.abs(goals[store as "aj"] ?? 0) / daysInMonth;

        acc.stacked_chart.push({name: store, sales, goal});
        acc.churn += sales;
      } else {
        console.warn(`Invalid daily sales format for store: ${store}`);
      }
      return acc;
    },
    {churn: 0, stacked_chart: []},
  );

  return {churn: result.churn.toFixed(2), stacked_chart: result.stacked_chart};
};

const buildMonthlySalesGoals = (goals: BiglySalesGoals | null) => {
  if (!goals) return emptyStackedChart();

  const storeTotals: Record<string, number> = {};
  let churn = 0;

  Object.entries(goals.sum).forEach(([date, {sales}]) => {
    Object.entries(sales).forEach(([store, value]) => {
      storeTotals[store] = (storeTotals[store] ?? 0) + Math.abs(value);
      churn += Math.abs(value);
    });
  });

  const stacked_chart = Object.entries(storeTotals).map(([name, sales]) => ({
    name,
    sales,
    goal: Math.abs(goals[name as "aj"] ?? 0),
  }));

  return {churn: churn.toFixed(2), stacked_chart};
};

const buildHeaderSalesGoals = (
  goals: BiglySalesGoals | null,
): HeaderAnalytics => {
  if (!goals) {
    return {
      total_units: 0,
      completed_units: 0,
      total_jobs: 0,
      completed_jobs: 0,
    };
  }

  const excludedKeys = ["annual", "id", "sum", "ytd"];

  const monthly_goals = Object.entries(goals).reduce((sum, [key, value]) => {
    return excludedKeys.includes(key) ? sum : sum + Number(value);
  }, 0);

  const monthly_totals = Object.values(goals.sum ?? {}).reduce((sum, store) => {
    return sum + (store?.total ?? 0);
  }, 0);

  return {
    total_units: monthly_goals,
    completed_units: monthly_totals,
    total_jobs: goals.annual ?? 0,
    completed_jobs: (goals.ytd ?? 0) + monthly_totals,
  };
};

// ============================ Shopify Charts ============================
const buildGrossSales = (yesterday: Yesterday) => {
  const grossSales = emptyBarChart();
  if (!yesterday) return grossSales;

  return grossSales;
};

// ============================ BASE PAYLOD ============================
const emptyStackedChart = () => ({
  churn: "0",
  stacked_chart: [],
});

const emptyBarChart = () => ({
  sum: 0,
  bar_chart: [],
});

export const getBaseReportData = (): PasedReportData => ({
  daily_sales_goals: emptyStackedChart(),
  monthly_sales_goals: emptyStackedChart(),
  header: {
    total_units: 0,
    completed_units: 0,
    total_jobs: 0,
    completed_jobs: 0,
  },
  gross_sales: emptyBarChart(),
  discounts: emptyBarChart(),
  orders: emptyBarChart(),
  returns: emptyBarChart(),
  total_sales: emptyBarChart(),
  shipping_charges: emptyBarChart(),
  recharge: emptyStackedChart(),
  stripe: emptyStackedChart(),
  emails: emptyStackedChart(),
  conversion_value: emptyBarChart(),
  open_rate: emptyBarChart(),
  click_rate: emptyBarChart(),
  recipients: emptyBarChart(),
  conversion_rate: emptyBarChart(),
});

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
