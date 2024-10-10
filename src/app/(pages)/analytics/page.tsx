"use client";
import {AnalyticsHeader} from "@/components/analytics/AnalyticsHeader";
import styles from "../../../components/Shared.module.css";
import {AnalyticsCard} from "@/components/analytics/AnalyticsCard";
import {BarChartStats, LineChartStats} from "@/components/analytics/charts";
import {SkeletonAnalytic} from "@/components/skeleton/SkeletonAnalytics";
import {useAnalytics} from "@/lib/hooks/useAnalytics";
import {parseAnalytics} from "@/lib/payloads/analytics";

export default function Analytics() {
  const {loading, analytics} = useAnalytics();
  const {
    header,
    average_job,
    average_error,
    average_time,
    top_errors,
    top_sellers,
    top_types,
  } = parseAnalytics(analytics);
  return (
    <div className={styles.page}>
      <AnalyticsHeader header={header} loading={loading} />
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
            >
              <BarChartStats
                color={"#e85f5c"}
                data={average_error.bar_chart}
                suffix={"%"}
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
