// components/AnalyticsTable.tsx
import {memo, useMemo} from "react";
import {formatWithCommas} from "@/lib/utils/converter.tsx/numbers";
import styles from "../../Shared.module.css";
import tableStyles from "../../files/Files.module.css";
import {CleanedAnalytics} from "@/lib/types/reports";

type AnalyticsTableProps = {
  title: string;
  width: number;
  data: CleanedAnalytics | null;
};

const HEADERS = [
  "Product Name",
  "Store",
  "Total Count",
  "Created",
  "Cancelled",
  "Net Gain",
  "Churn Rate",
];

export const RechargeTable = memo(
  ({title, width, data}: AnalyticsTableProps) => {
    const rows = useMemo(() => {
      if (!data) return [];

      return Object.entries(data.yesterday).flatMap(
        ([storeName, storeData]) => {
          const platformData = storeData.recharge;
          if (!platformData) return [];

          return Object.entries(platformData)
            .map(([product, metrics]) => {
              const created = metrics.created ?? 0;
              const cancelled = metrics.cancelled ?? 0;
              const totalCount = metrics.total_count ?? 0;
              const net = created - cancelled;
              const churnRate =
                created === 0 && cancelled === 0
                  ? "0"
                  : created === 0 && cancelled > 0
                  ? "100"
                  : ((cancelled / created) * 100).toFixed(2);

              return {
                product,
                storeName,
                totalCount,
                net,
                created,
                cancelled,
                churnRate: churnRate,
              };
            })
            .sort((a, b) => {
              return b.totalCount - a.totalCount;
            });
        },
      );
    }, [data]);

    return (
      <div
        className={styles.chartWrapperBox}
        style={{width: `${width}%`, maxHeight: "300px"}}
      >
        <header>
          <h5>{title}</h5>
        </header>
        <main
          className={`${styles.tableContainer} ${tableStyles.fileTableWrapper}`}
          style={{maxHeight: "300px", overflow: "auto", position: "relative"}}
        >
          <table style={{minWidth: "120%"}}>
            <thead style={{position: "sticky", top: 0}}>
              <tr>
                {HEADERS.map((header, i) => (
                  <th
                    key={header}
                    className={styles.tableHeader}
                    style={{
                      padding: i == 0 ? "0 1rem" : "7px 0",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{overflow: "scroll"}}>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={HEADERS.length}
                    style={{
                      padding: "7px 1rem",
                    }}
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr key={idx}>
                    <td
                      className={styles.tableCell}
                      style={{
                        padding: "7px 1rem",
                      }}
                    >
                      {row.product}
                    </td>
                    <td style={{fontWeight: 550}}>
                      {row.storeName.toLocaleUpperCase()}
                    </td>
                    <td>{formatWithCommas(row.totalCount)}</td>
                    <td>{formatWithCommas(row.created)}</td>
                    <td>{formatWithCommas(row.cancelled)}</td>
                    <td style={{color: Number(row.net) < 0 ? "red" : ""}}>
                      {formatWithCommas(row.net)}
                    </td>
                    <td className={styles.tableCell}>{row.churnRate}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </main>
      </div>
    );
  },
);

RechargeTable.displayName = "RechargeTable";
