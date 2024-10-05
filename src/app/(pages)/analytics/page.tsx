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
            title={"Avg. Job Completion"}
            width={32}
            main_value={"2.3"}
            metric="h"
          >
            <LineChartStats
              suffix={"h"}
              data={[
                {date: "mon", value: 5.5},
                {date: "tue", value: 5.8},
                {date: "wed", value: 5.3},
                {date: "thu", value: 5.0},
                {date: "fri", value: 5.7},
                {date: "sat", value: 5.9},
                {date: "sun", value: 0},
              ]}
            />
          </AnalyticsCard>

          <AnalyticsCard
            title={"Avg. Error Rate"}
            width={32}
            main_value={"0.3"}
            metric="%"
          >
            <BarChartStats
              color={"#e85f5c"}
              data={[
                {name: "printing", value: 1},
                {name: "cutting", value: 0.2},
                {name: "pressing", value: 3},
                {name: "double", value: 0.3},
                {name: "folding", value: 0.2},
              ]}
              suffix={"%"}
            />
          </AnalyticsCard>
          <AnalyticsCard
            title={"Avg. Time per Station"}
            width={32}
            main_value={"1.9"}
            metric="h"
          >
            <BarChartStats
              suffix={"h"}
              data={[
                {name: "printing", value: 1.9},
                {name: "cutting", value: 1.2},
                {name: "pressing", value: 1.9},
                {name: "double", value: 1.3},
                {name: "folding", value: 1.1},
              ]}
            />
          </AnalyticsCard>
        </section>

        <section
          className={styles.rowSection}
          style={{marginTop: "1rem", justifyContent: "space-between"}}
        >
          <AnalyticsCard
            title={"Individual Errors"}
            width={32}
            main_value={"Saul"}
            metric=""
          >
            <BarChartStats
              fixed={0}
              color={"#e85f5c"}
              data={[
                {name: "Walter", value: 5},
                {name: "Jesse", value: 18},
                {name: "Saul", value: 25},
                {name: "Hank", value: 2},
                {name: "Gus", value: 11},
              ]}
              suffix={""}
            />
          </AnalyticsCard>

          <AnalyticsCard
            title={"Top Designs"}
            width={32}
            main_value={"Trust God Not Government Hoodie"}
            metric=""
          >
            <BarChartStats
              fixed={0}
              data={[
                {name: "Disobey Hoodie", value: 749},
                {name: "Trust God Not Government Hoodie", value: 1200},
                {name: "1776", value: 556},
                {name: "Turn In Your Guns Hoodie", value: 852},
                {name: "Still Standing Hoodie", value: 904},
              ]}
              suffix={""}
            />
          </AnalyticsCard>
          <AnalyticsCard
            title={"Top Type"}
            width={32}
            main_value={"Shirt"}
            metric=""
          >
            <BarChartStats
              suffix={""}
              fixed={0}
              data={[
                {name: "Hoodie", value: 1200},
                {name: "Shirt", value: 1802},
                {name: "Hat", value: 908},
              ]}
            />
          </AnalyticsCard>
        </section>
      </div>
    </div>
  );
}
