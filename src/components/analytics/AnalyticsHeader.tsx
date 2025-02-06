import {HeaderAnalytics, TimeFrameTypes} from "@/lib/types/analytics";
import {capitalizeWords} from "@/lib/utils/converter.tsx/text";
import {SkeletonText} from "../skeleton/SkeletonText";
import {Button} from "@/components/shared/Button";
import {LoadingTypes} from "@/lib/types/shared";
import styles from "../Shared.module.css";
import {HalfCircleStats} from "./charts";
import localFont from "next/font/local";
import {useState} from "react";
import {formatNumber} from "@/lib/utils/converter.tsx/numbers";
// import DatePicker from "react-date-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import {formatDateToYYYYMMDD} from "@/lib/utils/converter.tsx/time";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const geistSans = localFont({
  src: "../../app/fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export const AnalyticsHeader = ({
  loading,
  header,
  timeframe,
  reports = false,
  title = "Anlaytics",
  fetchAnalytics,
}: {
  title?: string;
  reports: boolean;
  loading: LoadingTypes;
  header?: HeaderAnalytics;
  fetchAnalytics: (t: TimeFrameTypes) => void;
  timeframe: TimeFrameTypes;
}) => {
  const [range, setRange] = useState<Value>([new Date(), new Date()]);

  const [type, setType] = useState<"jobs" | "units">("jobs");
  const [custom, setCustom] = useState(false);
  const [modal, openModal] = useState(false);
  const handleSelectModal = (type: TimeFrameTypes) => {
    openModal((p) => !p);
    if (type === "custom") {
      setCustom(true);
      return;
    } else {
      setCustom(false);
      fetchAnalytics(type);
    }
  };

  const handleDateRange = () => {
    if (!range || !Array.isArray(range)) {
      setCustom(false);
      return;
    }
    let tf = `${formatDateToYYYYMMDD(range[0] as Date)}`;

    if (range[1]) {
      tf += `--${formatDateToYYYYMMDD(range[1] as Date)}`;
    }
    if (!range[0]) {
      tf = "yesterday";
    }

    setCustom(false);
    fetchAnalytics(tf);
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
          <h1 className={geistSans.className}>{title}</h1>
        </div>

        <div>
          {custom ? (
            <Button
              loading={false}
              thin={true}
              text={"Search"}
              tone={"success"}
              align={"center"}
              icon={"calendar"}
              onClick={() => handleDateRange()}
            />
          ) : (
            <Button
              loading={false}
              thin={true}
              text={capitalizeWords(timeframe).toLocaleUpperCase() || "TODAY"}
              tone={"success"}
              align={"center"}
              icon={"calendar"}
              onClick={() => openModal((p) => !p)}
            />
          )}

          {custom && (
            <div className={styles.dateRange}>
              {/* <DateRangePicker
                label="Placement start"
                selectorButtonPlacement="start"
              /> */}
              <DateRangePicker
                onChange={setRange}
                value={range}
                className={styles.datePicker}
              />
              {/* <DatePicker
                onChange={setEnd}
                value={end}
                className={styles.datePicker}
              /> */}
            </div>
          )}
        </div>

        {modal && (
          <div className={styles.timeFramWrapper}>
            <div onClick={() => handleSelectModal("today")}>
              <span>Today</span>
            </div>
            <div onClick={() => handleSelectModal("seven_days")}>
              <span>7 Days</span>
            </div>
            <div onClick={() => handleSelectModal("mtd")}>
              <span>Month To Date</span>
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
            <div onClick={() => handleSelectModal("custom")}>
              <span>Custom Range</span>
            </div>
          </div>
        )}
      </div>
      {header && (
        <>
          {loading == "loading" || header.total_units == 0 ? (
            <SkeletonHeader />
          ) : (
            <div className={styles.right}>
              <div className={styles.aTxt} onClick={() => setType("units")}>
                <h1 className={geistSans.className}>
                  {reports
                    ? formatNumber(header.total_units)
                    : header.total_units}
                </h1>
                <span> total{`${!reports ? " units" : " sales"}`}</span>
              </div>
              <div className={styles.chartContainer}>
                <HalfCircleStats
                  completed={header.completed_units / header.total_units}
                  data={[
                    {
                      name: "completed",
                      value: header.completed_units / header.total_units,
                    },
                    {
                      name: "needed",
                      value: 1 - header.completed_units / header.total_units,
                    },
                  ]}
                />
              </div>
              <div className={styles.aTxt} onClick={() => setType("jobs")}>
                <h1 className={geistSans.className}>
                  {reports
                    ? formatNumber(header.total_jobs)
                    : header.total_jobs}
                </h1>
                <span>total {`${!reports ? " units" : " sales"}`}</span>
              </div>
              <div className={`${styles.aTxt} ${styles.mobileComplete}`}>
                <h1 className={geistSans.className}>
                  {type == "jobs"
                    ? header.completed_jobs
                    : header.completed_units}
                </h1>
                <span>completed {type}</span>
              </div>
              <div className={styles.chartContainer}>
                <HalfCircleStats
                  completed={header.completed_jobs / header.total_jobs}
                  data={[
                    {
                      name: "needed",
                      value: header.completed_jobs / header.total_jobs,
                    },
                    {
                      name: "completed",
                      value: 1 - header.completed_jobs / header.total_jobs,
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </>
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
