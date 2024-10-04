"use client";
import {AnalyticsHeader} from "@/components/analytics/AnalyticsHeader";
import styles from "../../../components/Shared.module.css";
import {AnalyticsCard} from "@/components/analytics/AnalyticsCard";
import {BarChartStats, LineChartStats} from "@/components/analytics/charts";

export default function Analytics() {
  return (
    <div className={styles.page}>
      <AnalyticsHeader />
      <div>
        <section
          className={styles.rowSection}
          style={{marginTop: "1rem", justifyContent: "space-between"}}
        >
          <AnalyticsCard
            title={"Test"}
            width={33}
            main_value={"12222"}
            metric="%"
          >
            <LineChartStats
              data={[
                {date: "mon", value: 12},
                {date: "yes", value: 3},
                {date: "today", value: 4},
              ]}
            />
          </AnalyticsCard>

          <AnalyticsCard
            title={"Test"}
            width={33}
            main_value={"12222"}
            metric="%"
          >
            <BarChartStats
              data={[
                {name: "printing", value: 1},
                {name: "cutting", value: 0.2},
                {name: "pressing", value: 3},
                {name: "double", value: 0.3},
                {name: "folding", value: 0.2},
              ]}
            />
          </AnalyticsCard>
          <AnalyticsCard
            title={"Test"}
            width={33}
            main_value={"12222"}
            metric="%"
          >
            <BarChartStats
              data={[
                {name: "printing", value: 1},
                {name: "cutting", value: 0.2},
                {name: "pressing", value: 3},
                {name: "double", value: 0.3},
                {name: "folding", value: 0.2},
              ]}
            />
          </AnalyticsCard>
        </section>
        <section
          className={styles.rowSection}
          style={{margin: "1rem 0", justifyContent: "space-between"}}
        >
          <div className={styles.chartWrapperBox} style={{width: "32%"}}>
            w
          </div>
          <div className={styles.chartWrapperBox} style={{width: "32%"}}>
            s
          </div>
          <div className={styles.chartWrapperBox} style={{width: "32%"}}>
            c
          </div>
        </section>
        <section
          className={styles.rowSection}
          style={{marginBottom: "1rem", justifyContent: "space-between"}}
        >
          <div className={styles.chartWrapperBox} style={{width: "32%"}}>
            w
          </div>
          <div className={styles.chartWrapperBox} style={{width: "32%"}}>
            s
          </div>
          <div className={styles.chartWrapperBox} style={{width: "32%"}}>
            c
          </div>
        </section>
      </div>
    </div>
  );
}
