"use client";
import {BarChartStats, LineChartStats} from "@/components/analytics/charts";
import {SkeletonAnalytic} from "@/components/skeleton/SkeletonAnalytics";
import {AnalyticsHeader} from "@/components/analytics/AnalyticsHeader";
import {AnalyticsCard} from "@/components/analytics/AnalyticsCard";
import styles from "../../../components/Shared.module.css";
import {parseAnalytics} from "@/lib/payloads/analytics";
import {useAnalytics} from "@/lib/hooks/useAnalytics";
import {TimeFrameTypes} from "@/lib/types/analytics";
import {useState} from "react";

export default function Analytics() {
  const [tf, setTimeFrame] = useState<TimeFrameTypes>("today");
  const {loading, analytics, fetchTimeframe} = useAnalytics();
  const {
    header,
    average_job,
    average_error,
    average_time,
    top_errors,
    top_sellers,
    top_types,
  } = parseAnalytics(analytics);

  const handleFetchingAnalytics = (tf: TimeFrameTypes) => {
    setTimeFrame(tf);
    fetchTimeframe(tf);
  };
  return (
    <div className={styles.page}>
      <AnalyticsHeader
        header={header}
        loading={loading}
        fetchAnalytics={handleFetchingAnalytics}
        timeframe={tf}
        reports={false}
      />
      <div>
        <section
          className={styles.rowSection}
          style={{marginTop: "1rem", justifyContent: "space-between"}}
        >
          {loading == "loading" || loading == "posting" ? (
            <SkeletonAnalytic width={32} />
          ) : (
            <AnalyticsCard
              title={"Avg. Job Completion"}
              width={32}
              main_value={`${average_job.avg}`}
              metric="h"
            >
              <LineChartStats suffix={"h"} data={average_job.line_chart} />
            </AnalyticsCard>
          )}

          {loading == "loading" || loading == "posting" ? (
            <SkeletonAnalytic width={32} />
          ) : (
            <AnalyticsCard
              title={"Avg. Error Rate"}
              width={32}
              main_value={`${average_error.avg}`}
              metric="%"
              fixed={1}
            >
              <BarChartStats
                color={"#e85f5c"}
                data={average_error.bar_chart}
                suffix={"%"}
                fixed={1}
              />
            </AnalyticsCard>
          )}

          {loading == "loading" || loading == "posting" ? (
            <SkeletonAnalytic width={32} />
          ) : (
            <AnalyticsCard
              title={"Avg. Time per Station"}
              width={32}
              main_value={`${average_time.avg}`}
              metric="h"
              fixed={2}
            >
              <BarChartStats suffix={"h"} data={average_time.bar_chart} />
            </AnalyticsCard>
          )}
        </section>

        <section
          className={styles.rowSection}
          style={{marginTop: "1rem", justifyContent: "space-between"}}
        >
          {loading == "loading" || loading == "posting" ? (
            <SkeletonAnalytic width={32} />
          ) : (
            <AnalyticsCard
              title={"Individual Errors"}
              width={32}
              main_value={`${top_errors.top}`}
              metric=""
            >
              <BarChartStats
                fixed={0}
                color={"#e85f5c"}
                data={top_errors.bar_chart}
                suffix={""}
              />
            </AnalyticsCard>
          )}

          {loading == "loading" || loading == "posting" ? (
            <SkeletonAnalytic width={32} />
          ) : (
            <AnalyticsCard
              title={"Top Designs"}
              width={32}
              main_value={`${top_sellers.top}`}
              metric=""
            >
              <BarChartStats
                fixed={0}
                data={top_sellers.bar_chart}
                suffix={""}
              />
            </AnalyticsCard>
          )}

          {loading == "loading" || loading == "posting" ? (
            <SkeletonAnalytic width={32} />
          ) : (
            <AnalyticsCard
              title={"Top Type"}
              width={32}
              main_value={`${top_types.top}`}
              metric=""
            >
              <BarChartStats suffix={""} fixed={0} data={top_types.bar_chart} />
            </AnalyticsCard>
          )}
        </section>
      </div>
    </div>
  );
}
