import {BarChart, SubscriptionReport} from "@/lib/types/reports";
import {formatNumber} from "@/lib/utils/converter.tsx/numbers";
import {LoadingTypes} from "@/lib/types/shared";
import {AnalyticsCardGroup, CardConfig} from "../AnalyticCardGroups";

type ViewTypes = "table" | "time" | "chart";

type ChartViewProps = {
  loading: LoadingTypes;
  type: ViewTypes;
  gross_sales: BarChart;
  orders: BarChart;
  discounts: BarChart;
  returns: BarChart;
  total_sales: BarChart;
  stripe: SubscriptionReport;
  emails: SubscriptionReport;
  conversion_value: BarChart;
  open_rate: BarChart;
  click_rate: BarChart;
  recipients: BarChart;
  average_order_value: BarChart;
  recharge: SubscriptionReport;
};

export const ChartView = ({
  loading,
  type,
  gross_sales,
  orders,
  discounts,
  returns,
  total_sales,
  stripe,
  emails,
  conversion_value,
  open_rate,
  click_rate,
  recipients,
  average_order_value,
  recharge,
}: ChartViewProps) => {
  if (type !== "chart") return null;

  const secondRow = [
    {
      title: "Returns",
      width: 32,
      value: returns.sum,
      isMoney: true,
      negative: true,
      prefix: "$",
      fixed: 2,
      chartType: "bar",
      chartData: returns.bar_chart,
      color: "#e85f5c",
    },
    {
      title: "Total Sales",
      width: 32,
      value: total_sales.sum,
      isMoney: true,
      prefix: "$",
      fixed: 2,
      chartType: "bar",
      chartData: total_sales.bar_chart,
    },
    {
      title: "Stripe",
      width: 32,
      value: stripe.churn,
      fixed: 1,
      suffix: "%",
      prefix: undefined,
      chartType: "stacked",
      chartData: stripe.stacked_chart,
      color: "#e85f5c",
      metric: "% churn",
    },
  ] as CardConfig[];

  const topRow = [
    {
      title: "Gross Sales",
      width: 32,
      value: gross_sales.sum,
      isMoney: true,
      prefix: "$",
      fixed: 2,
      chartType: "bar",
      chartData: gross_sales.bar_chart,
    },
    {
      title: "Orders",
      width: 32,
      value: orders.sum,
      fixed: 0,
      chartType: "bar",
      chartData: orders.bar_chart,
    },
    {
      title: "Discounts",
      width: 32,
      value: discounts.sum,
      fixed: 2,
      isMoney: true,
      negative: true,
      prefix: "$",
      chartType: "bar",
      chartData: discounts.bar_chart,
      color: "#e85f5c",
    },
  ] as CardConfig[];

  const thirdRow = [
    {
      title: "Email Churn",
      width: 32,
      value: emails.churn,
      fixed: 1,
      suffix: "%",
      prefix: undefined,
      chartType: "stacked",
      chartData: emails.stacked_chart,
      color: "#e85f5c",
      metric: "% churn",
    },
    {
      title: "Conversion Value",
      width: 32,
      value: conversion_value.sum,
      fixed: 2,
      isMoney: true,
      prefix: "$",
      chartType: "bar",
      chartData: conversion_value.bar_chart,
    },
    {
      title: "Average Order Value",
      width: 32,
      value: average_order_value.sum,
      fixed: 2,
      isMoney: true,
      prefix: "$",
      chartType: "bar",
      chartData: average_order_value.bar_chart,
    },
  ] as CardConfig[];

  const forthRow = [
    {
      title: "Recipients",
      width: 32,
      value: `${formatNumber(recipients.sum!)}`,
      prefix: "$",
      fixed: 0,
      chartType: "bar",
      chartData: recipients.bar_chart,
      metric: "",
      suffix: "",
      color: "#A1A5F4",
    },
    {
      title: "Open Rate (emails)",
      width: 32,
      value: open_rate.sum,
      fixed: 1,
      suffix: "%",
      prefix: undefined,
      chartType: "bar",
      chartData: open_rate.bar_chart,
      metric: "%",
      color: "#A1A5F4",
    },
    {
      title: "Click Rate (emails)",
      width: 32,
      value: click_rate.sum,
      fixed: 2,
      suffix: "%",
      prefix: undefined,
      chartType: "bar",
      chartData: click_rate.bar_chart,
      metric: "%",
      color: "#A1A5F4",
    },
  ] as CardConfig[];

  return (
    <>
      <AnalyticsCardGroup loading={loading} cards={topRow} />
      <AnalyticsCardGroup loading={loading} cards={secondRow} />
      <AnalyticsCardGroup
        loading={loading}
        cards={[
          {
            title: "Recharge",
            width: 100,
            value: recharge.churn,
            fixed: 1,
            suffix: "%",
            prefix: undefined,
            chartType: "stacked",
            chartData: recharge.stacked_chart,
            color: "#e85f5c",
            metric: "% churn",
          },
        ]}
      />
      <AnalyticsCardGroup loading={loading} cards={thirdRow} />
      <AnalyticsCardGroup loading={loading} cards={forthRow} />
    </>
  );
};
