import {HeaderAnalytics, NameValueProps} from "../types/analytics";
import {
  BiglyDailyReportDocument,
  BiglySalesGoals,
  KlaviyoStoreAnalytics,
  KlaviyoStoreNames,
  ParsedBaseType,
  PasedReportData,
  RechargeAnalytics,
  ReportHeader,
  ShopifyAnalytics,
  ShopifyStoreNames,
  StackChartProps,
} from "../types/reports";
import {formatWithCommas} from "../utils/converter.tsx/numbers";
import {getDaysInCurrentMonth} from "../utils/converter.tsx/time";

export const parseReportData = (
  analytics: BiglyDailyReportDocument[] | null,
  goals: BiglySalesGoals | null,
): PasedReportData => {
  const payload = getBaseReportData();
  if (!analytics) return payload;

  const base = parsedBase();

  for (const doc of analytics) {
    // Process Sub data
    processSubs(base, doc.stripe, "stripe");
    processSubs(base, doc.recharge, "recharge");

    // Process Sales data
    processSales(base, doc.shopify, "gross_sales");
    processSales(base, doc.shopify, "orders");
    processSales(base, doc.shopify, "returns");
    processSales(base, doc.shopify, "discounts");
    processSales(base, doc.shopify, "total_sales");
    processSales(base, doc.shopify, "shipping_charges");

    // Process Email Sub data
    processEmailSubs(base, doc.klaviyo);

    // Process Klaviyo Email data
    processMarketing(base, doc.klaviyo, "click_rate", 100);
    processMarketing(base, doc.klaviyo, "open_rate", 100);
    processMarketing(base, doc.klaviyo, "conversion_rate", 100);
    processMarketing(base, doc.klaviyo, "recipients", 1);
    processMarketing(base, doc.klaviyo, "conversion_value", 1);
  }

  // Subscriptions Chart Data
  payload.stripe = processSubscriptions(base, "stripe");
  payload.recharge = processSubscriptions(base, "recharge");

  // Shopify Chart Data
  payload.gross_sales = processShopify(base, "gross_sales");
  payload.orders = processShopify(base, "orders");
  payload.discounts = processShopify(base, "discounts");
  payload.returns = processShopify(base, "returns");
  payload.total_sales = processShopify(base, "total_sales");
  payload.shipping_charges = processShopify(base, "shipping_charges");

  // Klaviyo Chart Data
  payload.emails = processEmailSubscriptions(base);
  payload.recipients = processKlaviyo(base, "recipients", false);
  payload.conversion_value = processKlaviyo(base, "conversion_value", false);

  // ? Work on ratios
  payload.click_rate = processKlaviyo(base, "click_rate", true);
  payload.open_rate = processKlaviyo(base, "open_rate", true);
  payload.conversion_rate = processKlaviyo(base, "conversion_rate", true);

  payload.daily_sales_goals = processSalesGoals(
    base,
    "gross_sales",
    goals!,
    true,
  );
  payload.monthly_sales_goals = processSalesGoals(
    base,
    "gross_sales",
    goals!,
    false,
  );

  payload.goals = processHeader(base, goals!);

  return payload;
};

// * PROCESS RAW DATA
// ========================================================
const processEmailSubs = (
  base: ParsedBaseType,
  data: Record<KlaviyoStoreNames, KlaviyoStoreAnalytics>,
): ParsedBaseType => {
  for (const [name, value] of Object.entries(data)) {
    if (value && typeof value === "object") {
      base.klaviyo[name as "aj"].subscribed += value.count.subscribed || 0;
      base.klaviyo[name as "aj"].unsubscribed += value.count.unsubscribed || 0;
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  return base;
};

// Work on avg
const processMarketing = (
  base: ParsedBaseType,
  data: Record<KlaviyoStoreNames, KlaviyoStoreAnalytics>,
  type:
    | "click_rate"
    | "open_rate"
    | "conversion_rate"
    | "recipients"
    | "conversion_value",
  multipler = 100,
): ParsedBaseType => {
  for (const [name, value] of Object.entries(data)) {
    if (value && typeof value === "object") {
      if (!value["statistics"] || !value["statistics"].length) continue;
      const stats = value["statistics"];
      const avg = multipler > 1 ? stats.length : 1;

      const d = stats.reduce((p, c) => {
        return p + c[type];
      }, 0);

      base.klaviyo[name as "aj"].campaing_count = stats.length;
      base.klaviyo[name as "aj"][type] += (Math.abs(d) / avg) * multipler;
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }
  return base;
};

const processSales = (
  base: ParsedBaseType,
  data: Record<ShopifyStoreNames, ShopifyAnalytics>,
  type:
    | "gross_sales"
    | "orders"
    | "discounts"
    | "returns"
    | "total_sales"
    | "shipping_charges",
): ParsedBaseType => {
  for (const [name, value] of Object.entries(data)) {
    if (value && typeof value === "object") {
      base.shopify[name as "aj"][type] += Math.abs(
        value[type as keyof ShopifyAnalytics],
      );
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  return base;
};

const processSubs = (
  base: ParsedBaseType,
  data: Record<KlaviyoStoreNames, RechargeAnalytics>,
  type: "stripe" | "recharge",
): ParsedBaseType => {
  for (const [name, value] of Object.entries(data)) {
    if (value && typeof value === "object") {
      base[type][name as "aj"].subscribed += value.created || 0;
      base[type][name as "aj"].unsubscribed += value.cancelled || 0;
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  return base;
};

// * Create Chart Data
// ========================================================
const processHeader = (
  base: ParsedBaseType,
  goals: BiglySalesGoals,
): HeaderAnalytics => {
  let goal = 0;
  for (const [k, v] of Object.entries(goals)) {
    if (k != "annual" && k != "id") {
      console.log(`[${k}, ${formatWithCommas(v)}]`);
      goal += Number(v);
    }
  }
  console.log(goal);

  return {
    total_units: goal,
    completed_units: 0,
    total_jobs: goals.annual,
    completed_jobs: 0,
  };
};

const processSalesGoals = (
  base: ParsedBaseType,
  key:
    | "orders"
    | "gross_sales"
    | "discounts"
    | "returns"
    | "total_sales"
    | "shipping_charges",
  goals: BiglySalesGoals,
  is_daily: boolean,
) => {
  const num = is_daily ? getDaysInCurrentMonth() : 1;

  let sum = 0;
  const bar_chart: {name: string; sales: number; goal: number}[] = [];

  for (const [name, value] of Object.entries(base.shopify)) {
    if (value && typeof value === "object") {
      bar_chart.push({
        name,
        sales: Math.abs(value[key]),
        goal: Math.abs(goals ? goals[name as "aj"] : 0) / num,
      });

      sum += Math.abs(value[key]);
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  return {
    churn: sum.toFixed(2),
    stacked_chart: bar_chart,
  };
};

const processKlaviyo = (
  base: ParsedBaseType,
  type:
    | "recipients"
    | "conversion_value"
    | "click_rate"
    | "open_rate"
    | "conversion_rate",
  get_mean: boolean,
) => {
  let sum = 0;
  let count = 0;
  const bar_chart: NameValueProps[] = [];

  for (const [name, value] of Object.entries(base.klaviyo)) {
    if (value && typeof value === "object") {
      bar_chart.push({
        name,
        value: base.klaviyo[name as "aj"][type],
      });

      count++;
      sum += base.klaviyo[name as "aj"][type];
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  return {
    sum: sum / (get_mean ? count : 1),
    bar_chart: bar_chart,
  };
};

const processEmailSubscriptions = (base: ParsedBaseType) => {
  const stacked_chart: StackChartProps[] = [];

  let count = 0;
  let unsubscribed = 0;
  let subscription = 0;
  for (const [name, value] of Object.entries(base.klaviyo)) {
    if (value && typeof value === "object") {
      stacked_chart.push({
        name,
        unsubscribed: value.unsubscribed || 0,
        subscription: value.subscribed || 0,
      });

      unsubscribed += value.unsubscribed;
      subscription += value.subscribed;
      count++;
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  let churn = Number(
    Number((unsubscribed / (subscription || 1)) * 100) / count,
  ).toFixed(2);

  return {
    churn,
    stacked_chart,
  };
};

const processShopify = (
  base: ParsedBaseType,
  key:
    | "orders"
    | "gross_sales"
    | "discounts"
    | "returns"
    | "total_sales"
    | "shipping_charges",
) => {
  let sum = 0;
  const bar_chart: NameValueProps[] = [];

  for (const [name, value] of Object.entries(base.shopify)) {
    if (value && typeof value === "object") {
      bar_chart.push({
        name,
        value: Math.abs(value[key]),
      });

      sum += Math.abs(value[key]);
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
  base: ParsedBaseType,
  type: "stripe" | "recharge",
) => {
  const stacked_chart: StackChartProps[] = [];

  let count = 0;
  let unsubscribed = 0;
  let subscription = 0;
  for (const [name, value] of Object.entries(base[type])) {
    if (value && typeof value === "object") {
      stacked_chart.push({
        name,
        unsubscribed: value.unsubscribed || 0,
        subscription: value.subscribed || 0,
      });

      unsubscribed += value.unsubscribed;
      subscription += value.subscribed;
      count++;
    } else {
      console.warn(`Invalid data format for key: ${name}`, value);
    }
  }

  let churn = Number(
    (Number(unsubscribed / (subscription || 1)) * 100) / count,
  ).toFixed(2);

  return {
    churn,
    stacked_chart,
  };
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
