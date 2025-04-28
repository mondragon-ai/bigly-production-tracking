import {useEffect, useMemo, useRef, useState} from "react";
import {HeaderAnalytics, TimeFrameTypes} from "@/lib/types/analytics";
import {capitalizeWords} from "@/lib/utils/converter.tsx/text";
import {SkeletonText} from "../skeleton/SkeletonText";
import {Button} from "@/components/shared/Button";
import {LoadingTypes} from "@/lib/types/shared";
import {Badge} from "../shared/Badge";
import {HalfCircleStats} from "./charts";
import styles from "../Shared.module.css";
import localFont from "next/font/local";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {formatNumber, formatToMoney} from "@/lib/utils/converter.tsx/numbers";
import {formatDateToYYYYMMDD} from "@/lib/utils/converter.tsx/time";
import {BiglySalesGoals} from "@/lib/types/reports";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import {useWidth} from "@/lib/hooks/useWidth";

const geistSans = localFont({
  src: "../../app/fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

type GoalEntry = {name: string; value: string};

type AnalyticsHeaderProps = {
  title?: string;
  reports: boolean;
  loading: LoadingTypes;
  header?: HeaderAnalytics;
  timeframe: TimeFrameTypes;
  goals: BiglySalesGoals | null;
  fetchAnalytics: (t: TimeFrameTypes | string) => void;
  saveGoals: (goals: BiglySalesGoals) => Promise<void>;
};

export const AnalyticsHeader = ({
  title = "Analytics",
  reports,
  loading,
  header,
  timeframe,
  goals,
  fetchAnalytics,
  saveGoals,
}: AnalyticsHeaderProps) => {
  const today = useMemo(() => new Date(), []);
  const [range, setRange] = useState<Value>([today, today]);
  const [viewType, setViewType] = useState<"jobs" | "units">("jobs");
  const [custom, setCustom] = useState(false);
  const [modal, toggleModal] = useState(false);
  const [goalsModal, toggleGoalsModal] = useState(false);

  const compareDay = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - 2);
    return d.toISOString().split("T")[0];
  }, [today]);

  const [goalState, setGoalState] = useState<Record<string, GoalEntry>>({});

  useEffect(() => {
    if (goals) {
      const formattedGoals = Object.entries(goals).reduce(
        (acc, [key, value]) => {
          const exclude = ["sum", "id", "ytd"];
          if (exclude.includes(key)) return acc;
          acc[key] = {name: key.toUpperCase(), value: String(value ?? "")};
          return acc;
        },
        {} as Record<string, GoalEntry>,
      );
      setGoalState(formattedGoals);
    }
  }, [goals]);

  const handleDateSearch = () => {
    if (!range || !Array.isArray(range)) {
      setCustom(false);
      return;
    }
    let tf = formatDateToYYYYMMDD(range[0]!);
    if (range[1]) tf += `--${formatDateToYYYYMMDD(range[1])}`;
    fetchAnalytics(tf as string);
    setCustom(false);
  };

  const handleSaveGoals = async () => {
    const payload: BiglySalesGoals = Object.entries(goalState).reduce(
      (acc, [key, val]) => {
        acc[key as "pod"] = Number(val.value);
        return acc;
      },
      {} as BiglySalesGoals,
    );

    await saveGoals(payload);
  };

  const handleSelectPreset = (type: TimeFrameTypes) => {
    toggleModal(false);
    if (type === "custom") {
      setCustom(true);
    } else {
      setCustom(false);
      fetchAnalytics(type);
    }
  };

  return (
    <>
      <header
        className={styles.pageHeaderWrapper}
        // style={{alignItems: "flex-end"}}
      >
        <div className={styles.left}>
          <div>
            <h1 className={geistSans.className}>{title}</h1>
            <Badge
              icon="chart-up"
              text="Goals"
              tone="success"
              style={{cursor: "pointer"}}
              onClick={() => toggleGoalsModal(true)}
            />
          </div>

          <div className={styles.dateSection}>
            <Button
              loading={false}
              thin
              text={custom ? "Search" : capitalizeWords(timeframe)}
              tone="success"
              align="center"
              icon="calendar"
              onClick={custom ? handleDateSearch : () => toggleModal(!modal)}
            />

            {custom && (
              <div className={styles.dateRange}>
                <DateRangePicker
                  onChange={setRange}
                  value={range}
                  className={styles.datePicker}
                  maxDate={new Date()}
                  minDate={new Date("2025-04-02")}
                />
              </div>
            )}

            <div className={styles.dateInfo}>
              <span>
                <strong>Date Range:</strong> {capitalizeWords(timeframe)}
              </span>
              <span>
                <strong>Compare Date:</strong> {compareDay}
              </span>
            </div>
          </div>

          {modal && (
            <div className={styles.timeFramWrapper}>
              {[
                "yesterday",
                "seven_days",
                "mtd",
                "thirty_days",
                "ninety_days",
                "twelve_months",
                "custom",
              ].map((type) => (
                <div
                  key={type}
                  onClick={() => handleSelectPreset(type as TimeFrameTypes)}
                >
                  <span>{capitalizeWords(type.replace("_", " "))}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {header &&
          (loading === "loading" || header.total_units === 0 ? (
            <SkeletonHeader />
          ) : (
            <div className={styles.right}>
              <AnalyticsCharts
                reports={reports}
                header={header}
                viewType={viewType}
                setViewType={setViewType}
              />
            </div>
          ))}
      </header>

      {goalsModal && (
        <div className={styles.goalsModal}>
          <div
            className={styles.bgModal}
            onClick={() => toggleGoalsModal(false)}
          />
          <div className={styles.goalCard}>
            <header>
              <h3>Goals</h3>
              <div>
                <Badge
                  icon="floppy"
                  text="Save"
                  tone="success"
                  onClick={handleSaveGoals}
                  style={{cursor: "pointer"}}
                />
                <Badge
                  icon="close"
                  text="Close"
                  tone="critical"
                  style={{cursor: "pointer"}}
                  onClick={() => toggleGoalsModal(false)}
                />
              </div>
            </header>

            <section className={styles.goalsContainer}>
              {Object.entries(goalState).map(([k, v]) => (
                <div key={k} className={styles.inputWrapper}>
                  <label htmlFor={k}>{v.name}</label>
                  <input
                    type="text"
                    name={v.name}
                    placeholder="$0.00"
                    value={v.value}
                    onChange={(e) =>
                      setGoalState((prev) => ({
                        ...prev,
                        [k]: {...v, value: e.target.value},
                      }))
                    }
                  />
                  <span>${formatNumber(Number(v.value))}</span>
                </div>
              ))}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

const AnalyticsCharts = ({
  reports,
  header,
  viewType,
  setViewType,
}: {
  reports: boolean;
  header: HeaderAnalytics;
  viewType: "jobs" | "units";
  setViewType: (type: "jobs" | "units") => void;
}) => {
  const width = useWidth();
  return (
    <>
      <div className={styles.aTxt} onClick={() => setViewType("units")}>
        <h1 className={geistSans.className}>
          {reports ? formatNumber(header.total_units) : header.total_units}
        </h1>
        <span>{reports ? "Monthly Goal" : "Total Units"}</span>
      </div>

      {reports && (
        <div
          className={styles.aTxt}
          onClick={() => setViewType("units")}
          style={{display: width < 720 ? "flex" : "none"}}
        >
          <h1 className={geistSans.className}>
            {formatNumber(header.completed_units)}
          </h1>
          <span>Monthly Totals</span>
        </div>
      )}
      <div className={styles.chartContainer}>
        <HalfCircleStats
          completed={header.completed_units / header.total_units}
          data={[
            {
              name: "Completed",
              value: header.completed_units / header.total_units,
            },
            {
              name: "Needed",
              value: 1 - header.completed_units / header.total_units,
            },
          ]}
        />
      </div>

      <div className={styles.aTxt} onClick={() => setViewType("jobs")}>
        <h1 className={geistSans.className}>
          {reports ? formatNumber(header.total_jobs) : header.total_jobs}
        </h1>
        <span>{reports ? "Yearly Goal" : "Total Jobs"}</span>
      </div>

      {reports && (
        <div
          className={styles.aTxt}
          style={{display: width < 720 ? "flex" : "none"}}
        >
          <h1 className={geistSans.className}>
            {formatNumber(header.completed_jobs)}
          </h1>
          <span>Yearly Totals</span>
        </div>
      )}

      <div className={styles.chartContainer}>
        <HalfCircleStats
          completed={header.completed_jobs / header.total_jobs}
          data={[
            {
              name: "Completed",
              value: header.completed_jobs / header.total_jobs,
            },
            {
              name: "Needed",
              value: 1 - header.completed_jobs / header.total_jobs,
            },
          ]}
        />
      </div>
    </>
  );
};

const SkeletonHeader = () => (
  <div className={styles.right}>
    {[...Array(2)].map((_, i) => (
      <div key={i} className={styles.aTxt}>
        <SkeletonText width={100} header />
        <span>total units</span>
      </div>
    ))}
    {[...Array(2)].map((_, i) => (
      <div key={i} className={styles.chartContainer}>
        <div className={styles.sklHalf}></div>
      </div>
    ))}
  </div>
);
