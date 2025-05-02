"use client";

import {AnalyticsCardGroup, CardConfig} from "./components/AnalyticCardGroups";
import {AnalyticsHeader} from "@/components/analytics/AnalyticsHeader";
import {parseReportData} from "@/lib/payloads/reports/buildView";
import styles from "../../../components/Shared.module.css";
import {TimeSeries} from "./components/views/TimeSeries";
import {ChartView} from "./components/views/ChartView";
import {TableView} from "./components/views/TableView";
import {TimeFrameTypes} from "@/lib/types/analytics";
import {useReports} from "@/lib/hooks/useReports";
import {useState} from "react";

type ViewTypes = "table" | "time" | "chart";

export default function Analytics() {
  const [tf, setTimeFrame] = useState<TimeFrameTypes>("yesterday");
  const [viewType, setViewType] = useState<ViewTypes>("table");
  const {loading, analytics, goals, rawRow, fetchTimeframe, saveGoals} =
    useReports(viewType);

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
    products,
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
      suffix: "",
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
      suffix: "",
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
        {viewType === "chart" && (
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
          products={products}
        />
        <TimeSeries analytics={rawRow} type={viewType} />
      </div>
    </div>
  );
}
