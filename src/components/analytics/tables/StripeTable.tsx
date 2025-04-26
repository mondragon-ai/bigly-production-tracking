import {memo, useEffect, useMemo, useState} from "react";
import {
  formatToMoney,
  formatWithCommas,
} from "@/lib/utils/converter.tsx/numbers";
import styles from "../../Shared.module.css";
import tableStyles from "../../files/Files.module.css";
import {CleanedAnalytics, Stores} from "@/lib/types/reports";
import {useWidth} from "@/lib/hooks/useWidth";
import {capitalizeWords} from "@/lib/utils/converter.tsx/text";

type AnalyticsTableProps = {
  title: string;
  width: number;
  data: CleanedAnalytics | null;
};

type RowData = {
  storeName: string;
  total_count: number;
  created: number;
  cancelled: number;
  net_gain: number;
  churn: number;
};

const HEADERS = [
  "Store",
  "Total Count",
  "Net Gain",
  "subscribed",
  "unsubscribed",
  "church_rate",
];

const Arrow = ({value}: {value: number}) => (
  <span style={{fontSize: "8px", fontWeight: 700, marginLeft: "1px"}}>
    {value > 0 ? "↑" : value < 0 ? "↓" : ""}
  </span>
);

const Diff = ({value}: {value: number}) => (
  <span
    style={{
      color: value > 0 ? "green" : value < 0 ? "red" : undefined,
      display: "flex",
      alignItems: "center",
    }}
  >
    {value.toFixed(2)}%<Arrow value={value} />
  </span>
);

const calculateRows = (data: CleanedAnalytics | null): RowData[] => {
  if (!data) return [];

  const rows: RowData[] = [];

  Object.entries(data.yesterday).forEach(([storeName, storeData]) => {
    const platformData = storeData.stripe;

    if (platformData) {
      const {created, cancelled} = platformData;
      const churnRate =
        created === 0 && cancelled === 0
          ? "0"
          : created === 0 && cancelled > 0
          ? "100"
          : ((cancelled / created) * 100).toFixed(2);

      const net = created - cancelled;

      rows.push({
        storeName,
        ...platformData,
        net_gain: net,
        churn: Number(churnRate),
      });
    }
  });

  return [...rows];
};

export const StripeTable = memo(({title, width, data}: AnalyticsTableProps) => {
  const w = useWidth();
  const [total, setTotal] = useState<number>(0);
  const rows = useMemo(() => calculateRows(data), [data]);

  useEffect(() => {
    const tab_total = rows.reduce((acc, row) => {
      return acc + row.total_count;
    }, 0);
    setTotal(tab_total);
  }, [rows]);

  return (
    <div className={styles.chartWrapperBox} style={{width: `${width}%`}}>
      <header>
        <h5>{title}</h5>
        <h2>
          {formatWithCommas(total)}
          <span>&nbsp;subs</span>
        </h2>
      </header>
      <main
        className={`${styles.tableContainer} ${tableStyles.fileTableWrapper}`}
        style={{overflow: "auto", position: "relative"}}
      >
        <table style={{minWidth: w < 720 ? "170%" : "100%"}}>
          <thead style={{position: "sticky", top: 0}}>
            <tr>
              {HEADERS.map((header, i) => (
                <th
                  key={header}
                  className={styles.tableHeader}
                  style={{padding: i === 0 ? "0 1rem" : "7px 0"}}
                >
                  {capitalizeWords(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={HEADERS.length} style={{padding: "7px 1rem"}}>
                  No data available
                </td>
              </tr>
            ) : (
              <>
                {rows.map((row, idx) => (
                  <tr key={`${row.storeName}-${row.created}-${idx}`}>
                    <td
                      className={styles.tableCell}
                      style={{fontWeight: 550, padding: "7px 1rem"}}
                    >
                      {row.storeName.toUpperCase()}
                    </td>
                    <td>{formatWithCommas(row.total_count || 0)}</td>
                    <td style={{color: row.net_gain < 0 ? "red" : undefined}}>
                      {formatWithCommas(row.net_gain || 0)}
                    </td>
                    <td>{formatWithCommas(row.created || 0)}</td>
                    <td>{formatWithCommas(row.cancelled || 0)}</td>
                    <td>{formatWithCommas(row.churn || 0)}%</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
});

StripeTable.displayName = "StripeTable";
