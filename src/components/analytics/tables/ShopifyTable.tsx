import tableStyles from "../../files/Files.module.css";
import styles from "../../Shared.module.css";
import {memo, useMemo} from "react";
import {
  formatToMoney,
  formatWithCommas,
} from "@/lib/utils/converter.tsx/numbers";
import {CleanedAnalytics, Stores} from "@/lib/types/reports";
import {useWidth} from "@/lib/hooks/useWidth";

type AnalyticsTableProps = {
  title: string;
  width: number;
  data: CleanedAnalytics | null;
};

type RowData = {
  storeName: string;
  orders: number;
  aov: number;
  gross_sales: number;
  discounts: number;
  returns: number;
  net_sales: number;
  shipping_charges: number;
  taxes: number;
  total_sales: number;
  orderDiff: number;
  totalDiff: number;
  aovDiff: number;
};

const HEADERS = [
  "Store",
  "Orders",
  "AOV",
  "Gross Sales",
  "Net Sales",
  "Returns",
  "Discounts",
  "Shipping",
  "Taxes",
  "Total Sales",
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

const calculateRows = (
  data: CleanedAnalytics | null,
): [RowData[], Record<string, number>] => {
  const totals: Record<string, number> = {
    orders: 0,
    gross_sales: 0,
    discounts: 0,
    returns: 0,
    net_sales: 0,
    shipping_charges: 0,
    taxes: 0,
    total_sales: 0,
  };

  if (!data) return [[], totals];

  const rows: RowData[] = [];

  for (const [storeName, storeData] of Object.entries(data.yesterday)) {
    const platformData = storeData.shopify;
    const comparisonData = data.comparison[storeName as Stores]?.shopify || {
      orders: 0,
      gross_sales: 0,
      discounts: 0,
      returns: 0,
      net_sales: 0,
      shipping_charges: 0,
      taxes: 0,
      total_sales: 0,
    };

    if (!platformData) continue;

    const {
      orders,
      gross_sales,
      discounts,
      returns,
      net_sales,
      shipping_charges,
      taxes,
      total_sales,
    } = platformData;
    const {orders: compOrders, total_sales: compTotal} = comparisonData;

    const aov = orders === 0 ? 0 : total_sales / orders;
    const compAov = compOrders === 0 ? 0 : compTotal / compOrders;

    const orderDiff =
      compOrders === 0 ? 0 : ((orders - compOrders) / compOrders) * 100;
    const totalDiff =
      compTotal === 0 ? 0 : ((total_sales - compTotal) / compTotal) * 100;
    const aovDiff = compAov === 0 ? 0 : ((aov - compAov) / compAov) * 100;

    rows.push({
      storeName,
      orders,
      aov,
      gross_sales,
      discounts,
      returns,
      net_sales,
      shipping_charges,
      taxes,
      total_sales,
      orderDiff,
      totalDiff,
      aovDiff,
    });

    totals.orders += orders;
    totals.gross_sales += gross_sales;
    totals.discounts += discounts;
    totals.returns += returns;
    totals.net_sales += net_sales;
    totals.shipping_charges += shipping_charges;
    totals.taxes += taxes;
    totals.total_sales += total_sales;
  }

  return [rows, totals];
};

export const ShopifyTable = memo(
  ({title, width, data}: AnalyticsTableProps) => {
    const [rows, totals] = useMemo(() => calculateRows(data), [data]);
    const w = useWidth();

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
                <>
                  {rows
                    .sort((a, b) => b.total_sales - a.total_sales)
                    .map((row, idx) => (
                      <tr key={idx}>
                        <td
                          className={styles.tableCell}
                          style={{fontWeight: 550, padding: "7px 1rem"}}
                        >
                          {row.storeName.toUpperCase()}
                        </td>
                        <td>
                          {formatWithCommas(row.orders)}
                          <br />
                          <Diff value={row.orderDiff} />
                        </td>
                        <td className={styles.tableCell}>
                          {formatToMoney(row.aov)}
                          <br />
                          <Diff value={row.aovDiff} />
                        </td>
                        <td>{formatToMoney(row.gross_sales)}</td>
                        <td>{formatToMoney(row.net_sales)}</td>
                        <td>{formatToMoney(row.returns)}</td>
                        <td>{formatToMoney(row.discounts)}</td>
                        <td>{formatToMoney(row.shipping_charges)}</td>
                        <td>{formatToMoney(row.taxes)}</td>
                        <td className={styles.tableCell}>
                          {formatToMoney(row.total_sales)}
                          <br />
                          <Diff value={row.totalDiff} />
                        </td>
                      </tr>
                    ))}
                  <tr>
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
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </main>
      </div>
    );
  },
);

ShopifyTable.displayName = "ShopifyTable";
