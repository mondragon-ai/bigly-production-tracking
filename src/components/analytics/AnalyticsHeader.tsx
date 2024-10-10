import {Button} from "@/components/shared/Button";
import styles from "../Shared.module.css";
import {HalfCircleStats} from "./charts";

import localFont from "next/font/local";
import {useState} from "react";
import {LoadingTypes} from "@/lib/types/shared";
import {SkeletonText} from "../skeleton/SkeletonText";
import {HeaderAnalytics} from "@/lib/types/analytics";
const geistSans = localFont({
  src: "../../app/fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const AnalyticsHeader = ({
  loading,
  header,
}: {
  loading: LoadingTypes;
  header: HeaderAnalytics;
}) => {
  const [modal, openModal] = useState(false);
  const handleSelectModal = (
    type:
      | "today"
      | "yesterday"
      | "seven_days"
      | "thirty_days"
      | "ninety_days"
      | "twelve_months",
  ) => {
    openModal((p) => !p);
  };
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
          onClick={() => openModal((p) => !p)}
        />

        {modal && (
          <div className={styles.timeFramWrapper}>
            <div onClick={() => handleSelectModal("today")}>
              <span>Today</span>
            </div>
            <div onClick={() => handleSelectModal("yesterday")}>
              <span>Yesterday</span>
            </div>
            <div onClick={() => handleSelectModal("seven_days")}>
              <span>7 Days</span>
            </div>
            <div onClick={() => handleSelectModal("thirty_days")}>
              <span>30 Days</span>
            </div>
            <div onClick={() => handleSelectModal("ninety_days")}>
              <span>90 Days</span>
            </div>
            <div onClick={() => handleSelectModal("twelve_months")}>
              <span>12 Months</span>
            </div>
          </div>
        )}
      </div>
      {loading == "loading" || header.total_units == 0 ? (
        <SkeletonHeader />
      ) : (
        <div className={styles.right}>
          <div className={styles.aTxt}>
            <h1 className={geistSans.className}>{header.total_units}</h1>
            <span>total units</span>
          </div>
          <div className={styles.chartContainer}>
            <HalfCircleStats
              data={[
                {name: "completed", value: header.completed_units},
                {name: "needed", value: header.total_units},
              ]}
            />
          </div>
          <div className={styles.aTxt}>
            <h1 className={geistSans.className}>{header.total_jobs}</h1>
            <span>total jobs</span>
          </div>
          <div className={styles.chartContainer}>
            <HalfCircleStats
              data={[
                {name: "completed", value: header.completed_jobs},
                {name: "needed", value: header.total_jobs},
              ]}
            />
          </div>
        </div>
      )}
    </header>
  );
};

const SkeletonHeader = () => {
  return (
    <div className={styles.right}>
      <div className={styles.aTxt}>
        <SkeletonText width={100} header={true} />
        <span>total units</span>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.sklHalf}></div>
      </div>
      <div className={styles.aTxt}>
        <SkeletonText width={100} header={true} />
        <span>total jobs</span>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.sklHalf}></div>
      </div>
    </div>
  );
};
