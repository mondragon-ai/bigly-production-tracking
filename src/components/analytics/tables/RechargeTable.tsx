import {memo, useEffect, useMemo, useState} from "react";
import {formatWithCommas} from "@/lib/utils/converter.tsx/numbers";
import styles from "../../Shared.module.css";
import tableStyles from "../../files/Files.module.css";
import {CleanedAnalytics, Stores} from "@/lib/types/reports";
import {useWidth} from "@/lib/hooks/useWidth";
import {Badge} from "@/components/shared/Badge";
import {SortingColumn} from "./SortingColumn";

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
] as const;

const HEADERS = [
  {name: "Product Name", key: ""},
  {name: "Total Count", key: "totalCount"},
  {name: "Created", key: "created"},
  {name: "Cancelled", key: "cancelled"},
  {name: "Net Gain", key: "net"},
  {name: "Churn Rate", key: "churnRate"},
] as const;

export const productMapping: Record<string, string> = {
  "MK-ULTRA": "MK-ULTRA",
  Shilajit: "Shilajit",
  Seamoss: "Seamoss",
  Ultimate: "Ultimate Burn",
  Atomic: "Atomic Defense",
  Superfood: "Optimal Human",
  CaloriBurn: "CaloriBurn",
  VIP: "VIP Club",
  Methylene: "Methylene Blue",
  Optimal: "Optimal Human",
  Coffee: "Coffee",
};

const calculateRows = (data: CleanedAnalytics | null): RowData[] => {
  if (!data) return [];

  const perProductTotals: Record<
    string,
    Omit<RowData, "storeName" | "churnRate"> & {storeCount: number}
  > = {};
  const rows: RowData[] = [];

  for (const [storeName, storeData] of Object.entries(data.yesterday)) {
    const platformData = storeData.recharge;
    if (!platformData) continue;

    for (const [variant, metrics] of Object.entries(platformData)) {
      const created = metrics.created ?? 0;
      const cancelled = metrics.cancelled ?? 0;
      const totalCount = metrics.total_count ?? 0;
      const net = created - cancelled;
      const churnRate =
        created === 0
          ? cancelled > 0
            ? "100"
            : "0"
          : ((cancelled / created) * 100).toFixed(2);

      rows.push({
        product: variant,
        storeName,
        totalCount,
        created,
        cancelled,
        net,
        churnRate,
      });

      let product = variant.split(" ")[0];
      product = product == "Superfood" ? "Optimal" : product;
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
    }
  }

  const totalRows = Object.entries(perProductTotals).map(
    ([product, metrics]) => {
      return {
        product: productMapping[product],
        storeName: "total",
        totalCount: metrics.totalCount,
        created: metrics.created,
        cancelled: metrics.cancelled,
        net: metrics.net,
        churnRate:
          metrics.created === 0
            ? metrics.cancelled > 0
              ? "100"
              : "0"
            : ((metrics.cancelled / metrics.created) * 100).toFixed(2),
      };
    },
  );

  return [...rows, ...totalRows].sort((a, b) => b.totalCount - a.totalCount);
};

export const RechargeTable = memo(
  ({title, width, data}: AnalyticsTableProps) => {
    const [selectedColumn, setSelectedColumn] = useState<{
      name: string;
      fromHighest: boolean;
    }>({name: "totalCount", fromHighest: true});

    const [selectedStore, setSelectedStore] = useState<Stores>("oh");
    const w = useWidth();

    const rows = useMemo(() => calculateRows(data), [data]);

    const filteredRows = useMemo(() => {
      const sortedRows = [...rows].filter(
        (row) => row.storeName === selectedStore,
      );
      sortedRows.sort((a, b) => {
        const compareA = a[selectedColumn.name as "totalCount"] ?? 0;
        const compareB = b[selectedColumn.name as "totalCount"] ?? 0;
        return selectedColumn.fromHighest
          ? compareB - compareA
          : compareA - compareB;
      });
      return sortedRows;
    }, [rows, selectedStore, selectedColumn]);

    const totalSubscriptions = useMemo(() => {
      return rows.reduce(
        (acc, row) =>
          row.storeName === selectedStore ? acc + row.totalCount : acc,
        0,
      );
    }, [rows, selectedStore]);

    return (
      <div
        className={styles.chartWrapperBox}
        style={{width: `${width}%`, overflow: "hidden"}}
      >
        <header>
          <h5>{title}</h5>
          <h2>
            {formatWithCommas(totalSubscriptions)}
            <span>&nbsp;subs</span>
          </h2>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
              overflow: "scroll",
            }}
          >
            {STORES.map((s) => (
              <Badge
                key={s.abbreviation}
                icon={"calendar"}
                text={s.name}
                tone={selectedStore === s.abbreviation ? "magic" : "info"}
                className={styles.tableBadge}
                onClick={() => setSelectedStore(s.abbreviation as Stores)}
              />
            ))}
          </div>
        </header>

        <main
          className={`${styles.tableContainer} ${tableStyles.fileTableWrapper}`}
          style={{overflow: "auto", position: "relative"}}
        >
          <table style={{minWidth: w < 720 ? "210%" : "100%"}}>
            <thead style={{position: "sticky", top: 0}}>
              <tr>
                {HEADERS.map((header, i) => (
                  <th
                    key={header.name}
                    className={styles.tableHeader}
                    style={{padding: i === 0 ? "0 1rem" : "7px 0"}}
                  >
                    <div>
                      {header.name}
                      {header.key && (
                        <SortingColumn
                          name={header.key}
                          column={selectedColumn}
                          setColumn={setSelectedColumn}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={HEADERS.length}
                    style={{padding: "7px 1rem", textAlign: "center"}}
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, idx) => (
                  <tr key={`${row.storeName}-${row.product}-${idx}`}>
                    <td
                      className={styles.tableCell}
                      style={{padding: "7px 1rem"}}
                    >
                      {row.product}
                    </td>
                    <td>{formatWithCommas(row.totalCount)}</td>
                    <td>{formatWithCommas(row.created)}</td>
                    <td>{formatWithCommas(row.cancelled)}</td>
                    <td style={{color: row.net < 0 ? "red" : undefined}}>
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
