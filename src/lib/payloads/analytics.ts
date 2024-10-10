import {
  HeaderAnalytics,
  ParsedAnalyticsReturn,
  ProductionAnalyticsType,
} from "../types/analytics";
import {ErrorRate, Stages} from "../types/jobs";
import {formatTimestamp} from "../utils/converter.tsx/time";

export const parseAnalytics = (
  analytics: ProductionAnalyticsType[] | null,
): ParsedAnalyticsReturn => {
  if (!analytics) return getAnalyticsData();

  return {
    header: {
      total_units: analytics.reduce((p, c) => p + c.total_units, 0),
      completed_units: analytics.reduce((p, c) => p + c.completed_units, 0),
      total_jobs: analytics.reduce((p, c) => p + c.total_jobs, 0),
      completed_jobs: analytics.reduce((p, c) => p + c.completed_jobs, 0),
    } as HeaderAnalytics,
    average_job: parseAvgTime(analytics),
    average_error: parseErrorRate(analytics),
    average_time: parseStationAvgTime(analytics),
    top_errors: parseTopErrors(analytics),
    top_sellers: parseTopSellers(analytics),
    top_types: parseTopTypes(analytics),
  };
};

const parseAvgTime = (analytics: ProductionAnalyticsType[]) => {
  console.log(analytics);
  const total = analytics.reduce((p, c) => p + c.averate_job_time, 0);
  const avg = Number(total / analytics.length).toFixed(1);
  const line_chart = analytics.map((item) => ({
    date: formatTimestamp(item.id),
    value: item.total_units,
  }));

  return {
    avg: Number(avg),
    line_chart: line_chart,
  };
};

const parseErrorRate = (analytics: ProductionAnalyticsType[]) => {
  const total = analytics.reduce(
    (p, c) => {
      Object.entries(c.error_rate).forEach(([key, value]) => {
        const typedKey = key as keyof ProductionAnalyticsType["error_rate"];
        if (p[typedKey] !== undefined) {
          p[typedKey] += value;
        }
      });
      return p;
    },
    {
      pending: 0,
      printing: 0,
      cutting: 0,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 0,
    },
  );

  const avg =
    Object.values(total).reduce((p, v) => p + v, 0) /
    Object.values(total).length;

  const data = [
    {name: "printing", value: total.printing},
    {name: "cutting", value: total.cutting},
    {name: "pressing", value: total.pressing},
    {name: "double", value: total.double},
    {name: "folding", value: total.folding},
  ];

  return {
    avg: Number(avg),
    bar_chart: data,
  };
};

const parseStationAvgTime = (analytics: ProductionAnalyticsType[]) => {
  const total = analytics.reduce(
    (p, c) => {
      Object.entries(c.averate_station_time).forEach(([key, value]) => {
        const typedKey =
          key as keyof ProductionAnalyticsType["averate_station_time"];
        if (p[typedKey] !== undefined) {
          p[typedKey] += value;
        }
      });
      return p;
    },
    {
      pending: 0,
      printing: 0,
      cutting: 0,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 0,
    },
  );

  const avg =
    Object.values(total).reduce((p, v) => p + v, 0) /
    Object.values(total).length;

  const data = [
    {name: "printing", value: total.printing},
    {name: "cutting", value: total.cutting},
    {name: "pressing", value: total.pressing},
    {name: "double", value: total.double},
    {name: "folding", value: total.folding},
  ];

  return {
    avg: Number(avg),
    bar_chart: data,
  };
};

const parseTopTypes = (analytics: ProductionAnalyticsType[]) => {
  const total = analytics.reduce(
    (p, c) => {
      Object.entries(c.top_types).forEach(([key, value]) => {
        const typedKey = key as keyof ProductionAnalyticsType["top_types"];
        if (p[typedKey] !== undefined) {
          p[typedKey] += value;
        }
      });
      return p;
    },
    {
      Hoodie: 0,
      Shirt: 0,
      Hat: 0,
    },
  );

  const topEntry = Object.entries(total).reduce((max, current) => {
    return current[1] > max[1] ? current : max;
  });

  const top = topEntry[0];

  const data = [
    {name: "Hoodie", value: total.Hoodie},
    {name: "Shirt", value: total.Shirt},
    {name: "Hat", value: total.Hat},
  ];

  return {
    top: top,
    bar_chart: data,
  };
};

const parseTopSellers = (analytics: ProductionAnalyticsType[]) => {
  const top_sellers = {} as {[key: string]: number};

  for (const day of analytics) {
    for (const [ts, value] of Object.entries(day.top_sellers)) {
      if (top_sellers[ts]) {
        top_sellers[ts] += value;
      } else {
        top_sellers[ts] = value;
      }
    }
  }

  const sortedSellers = Object.entries(top_sellers)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const top = sortedSellers.length > 0 ? sortedSellers[0][0] : "";

  const total = sortedSellers.map(([ts, amount]) => ({
    name: ts,
    value: amount,
  }));

  return {
    top: top ? top : "-",
    bar_chart: total.length > 0 ? total : [{name: "-", value: 0}],
  };
};

const parseTopErrors = (analytics: ProductionAnalyticsType[]) => {
  const individual_errors = {} as {[key: string]: number};

  for (const day of analytics) {
    for (const [ts, value] of Object.entries(day.individual_errors)) {
      if (individual_errors[ts]) {
        individual_errors[ts] += value;
      } else {
        individual_errors[ts] = value;
      }
    }
  }

  const sortedErrors = Object.entries(individual_errors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const top = sortedErrors.length > 0 ? sortedErrors[0][0] : "";

  const total = sortedErrors.map(([ts, amount]) => ({
    name: ts,
    value: amount,
  }));

  return {
    top: top ? top : "-",
    bar_chart: total.length > 0 ? total : [{name: "-", value: 0}],
  };
};

export const getAnalyticsData = (): ParsedAnalyticsReturn => {
  return {
    header: {
      total_units: 0,
      completed_units: 0,
      total_jobs: 0,
      completed_jobs: 0,
    } as HeaderAnalytics,
    average_job: {
      avg: 0,
      line_chart: [],
    },
    average_error: {
      avg: 0,
      bar_chart: [
        {name: "printing", value: 0},
        {name: "cutting", value: 0},
        {name: "pressing", value: 0},
        {name: "double", value: 0},
        {name: "folding", value: 0},
      ],
    },
    average_time: {
      avg: 0,
      bar_chart: [
        {name: "printing", value: 0},
        {name: "cutting", value: 0},
        {name: "pressing", value: 0},
        {name: "double", value: 0},
        {name: "folding", value: 0},
      ],
    },
    top_errors: {
      top: "-",
      bar_chart: [{name: "-", value: 0}],
    },
    top_sellers: {
      top: "-",
      bar_chart: [{name: "-", value: 0}],
    },
    top_types: {
      top: "-",
      bar_chart: [
        {name: "Hoodie", value: 0},
        {name: "Shirt", value: 0},
        {name: "Hat", value: 0},
      ],
    },
  };
};
