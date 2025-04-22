import tableStyles from "../../files/Files.module.css";
import {CleanedAnalytics, Stores} from "@/lib/types/reports";
import styles from "../../Shared.module.css";
import {memo, useMemo} from "react";
import {
  formatToMoney,
  formatWithCommas,
} from "@/lib/utils/converter.tsx/numbers";

type AnalyticsTableProps = {
  title: string;
  width: number;
  data: CleanedAnalytics | null;
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

const arrow = (num: number) => {
  return (
    <span style={{fontSize: "8px", fontWeight: 700, marginLeft: "1px"}}>
      {num > 0 ? "↑" : num < 0 ? "↓" : ""}
    </span>
  );
};

export const ShopifyTable = memo(
  ({title, width, data}: AnalyticsTableProps) => {
    const rows = useMemo(() => {
      if (!data) return [];

      return Object.entries(data.yesterday).flatMap(
        ([storeName, storeData]) => {
          const platformData = storeData.shopify;
          const comparisonData = data.comparison[storeName as Stores].shopify;
          if (!platformData) return [];

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

          const {
            orders: compOrders,
            gross_sales: compGross,
            discounts: compDiscounts,
            returns: compReturns,
            net_sales: compNet,
            shipping_charges: compShipping,
            taxes: compTaxes,
            total_sales: compTotal,
          } = comparisonData;

          const aov = orders == 0 ? 0 : total_sales / orders;
          const compAov = compOrders == 0 ? 0 : compTotal / compOrders;

          const orderDiff =
            compOrders == 0 ? 0 : ((orders - compOrders) / compOrders) * 100;
          const totalDiff =
            compTotal == 0 ? 0 : ((total_sales - compTotal) / compTotal) * 100;
          const aovDiff = compAov == 0 ? 0 : ((aov - compAov) / compAov) * 100;

          console.log({total_sales, compTotal, totalDiff, storeName});

          return {
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
          };
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
          <table style={{minWidth: "130%"}}>
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
                        fontWeight: 550,
                        padding: "7px 1rem",
                      }}
                    >
                      {row.storeName.toLocaleUpperCase()}
                    </td>
                    <td>
                      {formatWithCommas(row.orders)}
                      <br />
                      <span
                        style={{
                          color:
                            row.orderDiff > 0
                              ? "green"
                              : row.orderDiff < 0
                              ? "red"
                              : "",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {row.orderDiff.toFixed(2)}%{arrow(row.orderDiff)}
                      </span>
                    </td>

                    <td className={styles.tableCell}>
                      {formatToMoney(row.aov)}
                      <br />
                      <span
                        style={{
                          color:
                            row.aovDiff > 0
                              ? "green"
                              : row.aovDiff < 0
                              ? "red"
                              : "",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {row.aovDiff.toFixed(2)}%{arrow(row.aovDiff)}
                      </span>
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
                      <span
                        style={{
                          color:
                            row.totalDiff > 0
                              ? "green"
                              : row.totalDiff < 0
                              ? "red"
                              : "",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {row.totalDiff.toFixed(2)}%{arrow(row.totalDiff)}
                      </span>
                    </td>
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

ShopifyTable.displayName = "ShopifyTable";
