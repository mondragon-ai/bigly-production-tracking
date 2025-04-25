// components/RechargeTable.tsx
import {memo, useMemo, useState} from "react";
import {formatWithCommas} from "@/lib/utils/converter.tsx/numbers";
import styles from "../../Shared.module.css";
import tableStyles from "../../files/Files.module.css";
import {CleanedAnalytics, Stores} from "@/lib/types/reports";
import {useWidth} from "@/lib/hooks/useWidth";
import {Badge} from "@/components/shared/Badge";

type AnalyticsTableProps = {
  title: string;
  width: number;
  data: CleanedAnalytics | null;
};

type RowData = {
  product: string;
  storeName: string;
  totalCount: number;
  created: number;
  cancelled: number;
  net: number;
  churnRate: string;
};

const STORES = [
  {name: "OH", abbreviation: "oh"},
  {name: "Hodge Twins", abbreviation: "ht"},
  {name: "Real Alex Jones", abbreviation: "raj"},
  {name: "Alex Jones", abbreviation: "aj"},
  {name: "Shop Crowder", abbreviation: "sc"},
  {name: "Total", abbreviation: "total"},
];

const HEADERS = [
  "Product Name",
  // "Store",
  "Total Count",
  "Created",
  "Cancelled",
  "Net Gain",
  "Churn Rate",
];

const calculateRows = (data: CleanedAnalytics | null): RowData[] => {
  if (!data) return [];

  const perProductTotals: Record<
    string,
    Omit<RowData, "storeName" | "churnRate"> & {storeCount: number}
  > = {};
  const rows: RowData[] = [];

  Object.entries(data.yesterday).forEach(([storeName, storeData]) => {
    const platformData = storeData.recharge;
    if (!platformData) return;

    Object.entries(platformData).forEach(([product, metrics]) => {
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

      rows.push({
        product,
        storeName,
        totalCount,
        created,
        cancelled,
        net,
        churnRate,
      });

      if (!perProductTotals[product]) {
        perProductTotals[product] = {
          product,
          totalCount: 0,
          created: 0,
          cancelled: 0,
          net: 0,
          storeCount: 0,
        };
      }

      const totals = perProductTotals[product];
      totals.totalCount += totalCount;
      totals.created += created;
      totals.cancelled += cancelled;
      totals.net += net;
      totals.storeCount += 1;
    });
  });

  const totalRows: RowData[] = Object.entries(perProductTotals)
    .map(([product, metrics]) => {
      const churnRate =
        metrics.created === 0 && metrics.cancelled === 0
          ? "0"
          : metrics.created === 0 && metrics.cancelled > 0
          ? "100"
          : ((metrics.cancelled / metrics.created) * 100).toFixed(2);

      return {
        product,
        storeName: "total",
        totalCount: metrics.totalCount,
        created: metrics.created,
        cancelled: metrics.cancelled,
        net: metrics.net,
        churnRate,
      };
    })
    .sort((a, b) => b.totalCount - a.totalCount);

  return [...rows.sort((a, b) => b.totalCount - a.totalCount), ...totalRows];
};

export const RechargeTable = memo(
  ({title, width, data}: AnalyticsTableProps) => {
    const [store, setStore] = useState<Stores>("ht");
    const w = useWidth();
    const rows = useMemo(() => calculateRows(data), [data]);

    return (
      <div className={styles.chartWrapperBox} style={{width: `${width}%`}}>
        <header>
          <h5>{title}</h5>
          <div
            style={{marginTop: "10px", display: "flex", flexDirection: "row"}}
          >
            {STORES.map((s) => {
              const isSelected = s.abbreviation === store;
              return (
                <Badge
                  icon={"calendar"}
                  text={s.name}
                  tone={isSelected ? "magic" : "info"}
                  className={styles.tableBadge}
                  onClick={() => setStore(s.abbreviation as Stores)}
                />
              );
            })}
          </div>
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
                    {header}
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
                rows.map((row, idx) => {
                  if (store === row.storeName) {
                    return (
                      <tr key={`${row.storeName}-${row.product}-${idx}`}>
                        <td
                          className={styles.tableCell}
                          style={{padding: "7px 1rem"}}
                        >
                          {row.product}
                        </td>
                        {/* <td style={{fontWeight: 550}}>
                        {row.storeName.toUpperCase()}
                      </td> */}
                        <td>{formatWithCommas(row.totalCount)}</td>
                        <td>{formatWithCommas(row.created)}</td>
                        <td>{formatWithCommas(row.cancelled)}</td>
                        <td style={{color: row.net < 0 ? "red" : undefined}}>
                          {formatWithCommas(row.net)}
                        </td>
                        <td className={styles.tableCell}>{row.churnRate}%</td>
                      </tr>
                    );
                  }
                })
              )}
            </tbody>
          </table>
        </main>
      </div>
    );
  },
);

RechargeTable.displayName = "RechargeTable";
