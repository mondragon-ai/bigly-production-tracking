import {Button} from "@/components/shared/Button";
import {HalfCircleStats} from "./charts";
import styles from "../Shared.module.css";

import localFont from "next/font/local";
const geistSans = localFont({
  src: "../../app/fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const AnalyticsHeader = () => {
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
