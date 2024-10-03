"use client";
import localFont from "next/font/local";
import styles from "../../../components/Shared.module.css";
import {Button} from "@/components/shared/Button";
import {HalfCircleStats, PieChartStats} from "@/components/analytics/charts";

const geistSans = localFont({
  src: "../../fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function Analytics() {
  return (
    <div className={styles.page}>
      <AnalyticsHeader />
      <div>
        <section
          className={styles.rowSection}
          style={{marginTop: "1rem", justifyContent: "space-between"}}
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

const AnalyticsHeader = () => {
  return (
    <header
      className={styles.pageHeaderWrapper}
      style={{
        alignItems: "flex-end",
      }}
    >
      <div className={styles.left}>
        <div>
          <h1 className={geistSans.className}>Analytics</h1>
        </div>

        <Button
          loading={false}
          thin={true}
          text={"TODAY"}
          tone={"success"}
          align={"center"}
          icon={"calendar"}
          onClick={() => {}}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.aTxt}>
          <h1 className={geistSans.className}>3.3k</h1>
          <span>total item</span>
        </div>
        <div className={styles.chartContainer}>
          <HalfCircleStats
            data={[
              {name: "completed", value: 120},
              {name: "needed", value: 20},
            ]}
          />
        </div>
      </div>
    </header>
  );
};
