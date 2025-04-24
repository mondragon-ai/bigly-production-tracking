// components/RechargeTable.tsx
import {memo, useMemo} from "react";
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
  subscribed: number;
  unsubscribed: number;
  conversion_value: number;
  average_order_value: number;
  open_rate: number;
  click_rate: number;
  recipients: number;
  subDiff: number;
  unsubDiff: number;
  cvsValueDiff: number;
  recDiff: number;
};

const STORES = [
  {name: "OH", abbreviation: "oh"},
  {name: "Hodge Twins", abbreviation: "ht"},
  {name: "Alex Jones", abbreviation: "aj"},
  {name: "Shop Crowder", abbreviation: "sc"},
];

const HEADERS = [
  "Store",
  "subscribed",
  "unsubscribed",
  "conversion_value",
  "average_order_value",
  "open_rate",
  "click_rate",
  "recipients",
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
    const platformData = storeData.klaviyo;
    const comparisonData = data.comparison[storeName as Stores]?.klaviyo || {
      subscribed: 0,
      unsubscribed: 0,
      conversion_value: 0,
      average_order_value: 0,
      open_rate: 0,
      click_rate: 0,
      recipients: 0,
    };

    if (!platformData) return;

    const {subscribed, unsubscribed, conversion_value, recipients} =
      comparisonData;

    const subDiff =
      subscribed === 0
        ? 0
        : ((platformData.subscribed - subscribed) / subscribed) * 100;

    const unsubDiff =
      unsubscribed === 0
        ? 0
        : ((platformData.unsubscribed - unsubscribed) / unsubscribed) * 100;

    const cvsValueDiff =
      conversion_value === 0
        ? 0
        : ((platformData.conversion_value - conversion_value) /
            conversion_value) *
          100;

    const recDiff =
      recipients === 0
        ? 0
        : ((platformData.recipients - recipients) / recipients) * 100;

    rows.push({
      subscribed: platformData.subscribed,
      unsubscribed: platformData.unsubscribed,
      conversion_value: platformData.conversion_value,
      average_order_value: platformData.average_order_value,
      open_rate: Number((platformData.open_rate * 100).toFixed(2)),
      click_rate: Number((platformData.click_rate * 100).toFixed(2)),
      recipients: platformData.subscribed,
      subDiff,
      unsubDiff,
      cvsValueDiff,
      recDiff,
      storeName,
    });
  });

  return [...rows];
};

export const KlaviyoTable = memo(
  ({title, width, data}: AnalyticsTableProps) => {
    const w = useWidth();
    const rows = useMemo(() => calculateRows(data), [data]);

    return (
      <div className={styles.chartWrapperBox} style={{width: `${width}%`}}>
        <header>
          <h5>{title}</h5>
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
                    <tr key={`${row.storeName}-${row.subscribed}-${idx}`}>
                      <td
                        className={styles.tableCell}
                        style={{fontWeight: 550, padding: "7px 1rem"}}
                      >
                        {row.storeName.toUpperCase()}
                      </td>
                      <td>
                        {formatWithCommas(row.subscribed)}
                        <br />
                        <Diff value={row.subDiff} />
                      </td>
                      <td>
                        {formatWithCommas(row.unsubscribed)}
                        <br />
                        <Diff value={row.unsubDiff} />
                      </td>
                      <td>
                        {formatToMoney(row.conversion_value)}
                        <br />
                        <Diff value={row.cvsValueDiff} />
                      </td>
                      <td>{formatToMoney(row.average_order_value)}</td>
                      <td>{formatWithCommas(row.open_rate)}%</td>
                      <td>{formatWithCommas(row.click_rate)}%</td>
                      <td>
                        {formatWithCommas(row.recipients)}
                        <br />
                        <Diff value={row.recDiff} />
                      </td>
                    </tr>
                  ))}
                  {/* <tr>
                    <td
                      className={styles.tableCell}
                      style={{fontWeight: 550, padding: "7px 1rem"}}
                    >
                      Total
                    </td>
                    <td>{formatWithCommas(totals.orders)}</td>
                    <td className={styles.tableCell}>
                      {formatToMoney(
                        totals.orders === 0
                          ? 0
                          : totals.total_sales / totals.orders,
                      )}
                    </td>
                    <td>{formatToMoney(totals.gross_sales)}</td>
                    <td>{formatToMoney(totals.net_sales)}</td>
                    <td>{formatToMoney(totals.returns)}</td>
                    <td>{formatToMoney(totals.discounts)}</td>
                    <td>{formatToMoney(totals.shipping_charges)}</td>
                    <td>{formatToMoney(totals.taxes)}</td>
                    <td className={styles.tableCell}>
                      {formatToMoney(totals.total_sales)}
                    </td>
                  </tr> */}
                </>
              )}
            </tbody>
          </table>
        </main>
      </div>
    );
  },
);

KlaviyoTable.displayName = "KlaviyoTable";
