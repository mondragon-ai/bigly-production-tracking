"use client";

import {RechargeTable} from "@/components/analytics/tables/RechargeTable";
import {AnalyticsHeader} from "@/components/analytics/AnalyticsHeader";
import styles from "../../../components/Shared.module.css";
import {TimeFrameTypes} from "@/lib/types/analytics";
import {useReports} from "@/lib/hooks/useReports";
import {useState} from "react";
import {ShopifyTable} from "@/components/analytics/tables/ShopifyTable";
import {KlaviyoTable} from "@/components/analytics/tables/KlaviyoTable";
import {StripeTable} from "@/components/analytics/tables/StripeTable";
import {SkeletonAnalytic} from "@/components/skeleton/SkeletonAnalytics";
import {AnalyticsCard} from "@/components/analytics/AnalyticsCard";
import {ComparedBarChart} from "@/components/analytics/charts";
import {parseReportData} from "@/lib/payloads/reports";
import {CleanedAnalytics} from "@/lib/types/reports";
import {ChartView} from "./components/views/ChartView";
import {TableView} from "./components/views/TableView";
import {AnalyticsCardGroup, CardConfig} from "./components/AnalyticCardGroups";
import {TimeSeries} from "./components/views/TimeSeries";

type ViewTypes = "table" | "time" | "chart";

export default function Analytics() {
  const [tf, setTimeFrame] = useState<TimeFrameTypes>("yesterday");
  const [viewType, setViewType] = useState<ViewTypes>("table");
  const {loading, analytics, goals, fetchTimeframe, saveGoals} = useReports();

  const {
    daily_sales_goals,
    monthly_sales_goals,
    header,
    discounts,
    gross_sales,
    orders,
    total_sales,
    returns,
    stripe,
    emails,
    conversion_value,
    open_rate,
    click_rate,
    recipients,
    average_order_value,
    recharge,
  } = parseReportData(analytics, goals);

  const handleFetchingAnalytics = (t: TimeFrameTypes) => {
    const tp = [
      "yesterday",
      "seven_days",
      "thirty_days",
      "mtd",
      "ninety_days",
      "twelve_months",
      "custom",
    ];
    console.log({t, b: tp.includes(t)});
    if (tp.includes(t)) {
      setTimeFrame(t);
    } else {
      setTimeFrame("custom");
    }
    fetchTimeframe(t);
  };

  const mtd = Object.entries(goals?.sum || {}).reduce((acc, date) => {
    return acc + date[1].total;
  }, 0);

  const goalsChart = [
    {
      title: "Daily Goals",
      width: 49,
      value: daily_sales_goals.churn,
      fixed: 2,
      isMoney: true,
      prefix: "$",
      chartType: "compared",
      chartData: daily_sales_goals.stacked_chart,
    },
    {
      title: "Monthly Goals",
      width: 49,
      value: monthly_sales_goals.churn,
      fixed: 2,
      isMoney: true,
      prefix: "$",
      chartType: "compared",
      chartData: monthly_sales_goals.stacked_chart,
    },
  ] as CardConfig[];

  return (
    <div className={styles.page}>
      <AnalyticsHeader
        saveGoals={saveGoals}
        goals={goals}
        reports={true}
        header={header}
        title={"Daily Reports"}
        loading={loading}
        fetchAnalytics={handleFetchingAnalytics}
        timeframe={tf}
        type={viewType}
        setType={setViewType}
      />
      <div>
        {(viewType === "table" || viewType === "chart") && (
          <AnalyticsCardGroup loading={loading} cards={goalsChart} />
        )}

        <TableView analytics={analytics} type={viewType} />
        <ChartView
          loading={loading}
          type={viewType}
          gross_sales={gross_sales}
          orders={orders}
          discounts={discounts}
          returns={returns}
          total_sales={total_sales}
          stripe={stripe}
          emails={emails}
          conversion_value={conversion_value}
          open_rate={open_rate}
          click_rate={click_rate}
          recipients={recipients}
          average_order_value={average_order_value}
          recharge={recharge}
        />
        <TimeSeries analytics={analytics} type={viewType} />
      </div>
    </div>
  );
}
