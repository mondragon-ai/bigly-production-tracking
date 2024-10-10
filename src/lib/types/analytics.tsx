import {Stages} from "./jobs";

// FOMRATTED DATE
export type NameValueProps = {name: string; value: number};
export type ChartDateProps = {date: string; value: number};

export type ProductionAnalyticsType = {
  id: number;
  total_units: number;
  total_jobs: number;
  completed_units: number;
  completed_jobs: number;
  averate_station_time: StateTimes;
  averate_job_time: number;
  error_rate: StateTimes;
  top_types: {Shirt: number; Hat: number; Hoodie: number};
  individual_errors: Record<string, number>;
  top_sellers: Record<string, number>;
  created_at: number;
  updated_at: number;
};

export type StateTimes = {
  pending: number;
  printing: number;
  cutting: number;
  staging: number;
  pressing: number;
  double: number;
  folding: number;
};

export type HeaderAnalytics = {
  total_units: number;
  completed_units: number;
  total_jobs: number;
  completed_jobs: number;
};

export type ErrorRate = {[key in Stages]: number};

export type TimeFrameTypes =
  | "today"
  | "seven_days"
  | "thirty_days"
  | "ninety_days"
  | "twelve_months";

export type ParsedAnalyticsReturn = {
  header: HeaderAnalytics;
  average_job: {
    avg: number;
    line_chart: ChartDateProps[];
  };
  average_error: {
    avg: number;
    bar_chart: NameValueProps[];
  };
  average_time: {
    avg: number;
    bar_chart: NameValueProps[];
  };
  top_errors: {
    top: string;
    bar_chart: NameValueProps[];
  };
  top_sellers: {
    top: string;
    bar_chart: NameValueProps[];
  };
  top_types: {
    top: string;
    bar_chart: NameValueProps[];
  };
};
