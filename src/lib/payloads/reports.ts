import {HeaderAnalytics, NameValueProps} from "../types/analytics";
import {
  BarChart,
  BiglyDailyReportDocument,
  BiglySalesGoals,
  CleanedAnalytics,
  ParsedBaseType,
  PasedReportData,
  Platforms,
  SalesGoals,
  ShopifyAnalytics,
  StackChartProps,
  Stores,
  SubscriptionReport,
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
    gross_sales: buildShopifyData(yesterday, "gross_sales"),
    orders: buildShopifyData(yesterday, "orders"),
    discounts: buildShopifyData(yesterday, "discounts"),
    returns: buildShopifyData(yesterday, "returns"),
    total_sales: buildShopifyData(yesterday, "total_sales"),

    stripe: buildStripeData(yesterday),

    emails: processEmailSubscriptions(yesterday),
    conversion_value: processKlaviyo(yesterday, "conversion_value", false),
    open_rate: processKlaviyo(yesterday, "open_rate", true, true),
    click_rate: processKlaviyo(yesterday, "click_rate", true, true),
    recipients: processKlaviyo(yesterday, "recipients", false),
    average_order_value: processKlaviyo(yesterday, "average_order_value", true),

    recharge: buildRechargeData(yesterday),
  };
};

// ============================ Goal Charts ============================
const buildDailySalesGoals = (
  data: CleanedAnalytics["comparison"],
  goals: BiglySalesGoals | null,
) => {
  if (!goals || !data) return emptyCompareChart();

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
  if (!goals) return emptyCompareChart();

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
const buildShopifyData = (
  data: Record<Stores, BiglyDailyReportDocument>,
  metric:
    | "gross_sales"
    | "orders"
    | "discounts"
    | "returns"
    | "total_sales"
    | "shipping_charges",
) => {
  const base = emptyBarChart();
  for (const [store, storeData] of Object.entries(data)) {
    for (const [key, value] of Object.entries(storeData.shopify)) {
      if (key === metric) {
        base.bar_chart.push({
          name: store,
          value: Math.abs(value),
        });
        if (!base.sum) base.sum = 0;
        base.sum += Math.abs(value);
      }
    }
  }

  return base;
};

// ============================ Recharge Charts ============================
const buildRechargeData = (data: Record<Stores, BiglyDailyReportDocument>) => {
  const base = emptyStackedChart();

  let count = 0;
  let unsubscribed = 0;
  let subscription = 0;
  for (const [store, storeData] of Object.entries(data)) {
    for (const [product, productData] of Object.entries(
      storeData.recharge || {},
    )) {
      if (!product || !productData) continue;

      base.stacked_chart.push({
        name: product,
        unsubscribed: productData.cancelled,
        subscription: productData.created,
      });

      unsubscribed += productData.cancelled;
      subscription += productData.created;
      count++;
    }
  }

  let churn =
    subscription == 0
      ? "100"
      : Number(
          (Number(unsubscribed / (subscription || 1)) * 100) / (count || 1),
        ).toFixed(2);

  base.churn = churn;
  return base;
};

// ============================ Stripe Charts ============================
const buildStripeData = (data: Record<Stores, BiglyDailyReportDocument>) => {
  const base = emptyStackedChart();

  let count = 0;
  let unsubscribed = 0;
  let subscription = 0;
  for (const [store, storeData] of Object.entries(data)) {
    const value = storeData.stripe;
    if (!value) continue;

    base.stacked_chart.push({
      name: store,
      unsubscribed: Number(value?.cancelled) || 0,
      subscription: Number(value?.created) || 0,
    });

    unsubscribed += value.cancelled;
    subscription += value.created;
    count++;
  }

  let churn =
    subscription == 0
      ? "100"
      : Number(
          (Number(unsubscribed / (subscription || 1)) * 100) / (count || 1),
        ).toFixed(2);

  base.churn = churn;
  return base;
};

// ============================ Emails Charts ============================
const processEmailSubscriptions = (
  data: Record<Stores, BiglyDailyReportDocument>,
) => {
  const base = emptyStackedChart();

  let count = 0;
  let unsubscribed = 0;
  let subscription = 0;
  for (const [store, storeData] of Object.entries(data)) {
    const value = storeData.klaviyo;
    if (!value) continue;

    base.stacked_chart.push({
      name: store,
      unsubscribed: Number(value?.unsubscribed) || 0,
      subscription: Number(value?.subscribed) || 0,
    });

    unsubscribed += value.unsubscribed;
    subscription += value.subscribed;
    count++;
  }

  let churn =
    subscription == 0
      ? "100"
      : Number(
          Number((unsubscribed / (subscription || 1)) * 100) / count,
        ).toFixed(2);

  base.churn = churn;
  return base;
};

const processKlaviyo = (
  data: Record<Stores, BiglyDailyReportDocument>,
  type:
    | "recipients"
    | "conversion_value"
    | "click_rate"
    | "open_rate"
    | "average_order_value",
  get_mean: boolean,
  isPercentage: boolean = false,
) => {
  let sum = 0;
  let count = 0;
  const base = emptyBarChart();

  for (const [store, storeData] of Object.entries(data)) {
    const value = storeData.klaviyo;
    if (!value) continue;

    const metric = isPercentage
      ? Number(value[type] || 0) * 100
      : Number(value[type] || 0);
    base.bar_chart.push({
      name: store,
      value: metric,
    });

    count++;
    sum += metric;
  }

  base.sum = sum / (get_mean ? count : 1);
  return base;
};

// ============================ BASE PAYLOD ============================
const emptyCompareChart = (): SalesGoals => ({
  churn: "0",
  stacked_chart: [],
});

const emptyStackedChart = (): SubscriptionReport => ({
  churn: "0",
  stacked_chart: [],
});

const emptyBarChart = (): BarChart => ({
  sum: 0,
  bar_chart: [] as NameValueProps[],
});

export const getBaseReportData = (): PasedReportData => ({
  daily_sales_goals: emptyCompareChart(),
  monthly_sales_goals: emptyCompareChart(),
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
  average_order_value: emptyBarChart(),
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
