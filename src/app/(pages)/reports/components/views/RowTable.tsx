import {useMemo, useState} from "react";
import {formatWithCommas} from "@/lib/utils/converter.tsx/numbers";
import {useWidth} from "@/lib/hooks/useWidth";
import tableStyles from "../../../../../components/files/Files.module.css";
import styles from "../../../../../components/Shared.module.css";
import {SortingColumn} from "@/components/analytics/tables/SortingColumn";
import {capitalizeWords} from "@/lib/utils/converter.tsx/text";
import {formatTimestamp} from "@/lib/utils/converter.tsx/time";

type Header = {name: string; key: string};
type Row = Record<string, any>;

interface RowTableProps {
  headers: Header[];
  rows: Row[];
}

export const RowTable = ({headers, rows}: RowTableProps) => {
  const width = useWidth();
  const [selectedColumn, setSelectedColumn] = useState<{
    name: string;
    fromHighest: boolean;
  }>({
    name: headers[0]?.key ?? "",
    fromHighest: true,
  });

  const isNumericMetric = (key: string) =>
    ["orders", "aov", "total_sales", "returns", "discounts"].includes(key);

  const filteredRows = useMemo(() => {
    const sorted = [...rows].sort((a, b) => {
      const parseValue = (val: any, key: string) => {
        if (key === "date") return new Date(val).getTime() / 1000;
        if (isNumericMetric(key)) {
          return Number(String(val).replace(/[$,]/g, "")) || 0;
        }
        return val;
      };

      const valA = parseValue(a[selectedColumn.name], selectedColumn.name);
      const valB = parseValue(b[selectedColumn.name], selectedColumn.name);

      if (typeof valA === "number" && typeof valB === "number") {
        return selectedColumn.fromHighest ? valB - valA : valA - valB;
      }

      if (typeof valA === "string" && typeof valB === "string") {
        return selectedColumn.fromHighest
          ? valB.localeCompare(valA)
          : valA.localeCompare(valB);
      }

      return 0;
    });

    return sorted;
  }, [rows, selectedColumn]);

  return (
    <div
      className={styles.chartWrapperBox}
      style={{width: "100%", marginTop: "20px", overflow: "hidden"}}
    >
      <header>
        <h5>Data Rows</h5>
      </header>

      <main
        className={`${styles.tableContainer} ${tableStyles.fileTableWrapper}`}
        style={{overflow: "auto"}}
      >
        <table style={{minWidth: width < 720 ? "210%" : "100%"}}>
          <thead style={{position: "sticky", top: 0}}>
            <tr>
              {headers.map((header, i) => (
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
                  colSpan={headers.length}
                  style={{padding: "7px 1rem", textAlign: "center"}}
                >
                  No data available
                </td>
              </tr>
            ) : (
              filteredRows.map((row, idx) => (
                <tr key={idx}>
                  {headers.map(({key}, i) => (
                    <td
                      key={i}
                      className={styles.tableCell}
                      style={{padding: i == 0 ? "7px 1rem" : "7px 0"}}
                    >
                      {i == 0
                        ? String(row[key]).toLocaleUpperCase()
                        : renderCell(row[key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

const renderCell = (value: any) => {
  if (typeof value === "number") return formatWithCommas(value);
  if (typeof value === "string") return capitalizeWords(value);
  if (value instanceof Date) return value.toLocaleDateString();
  if (typeof value === "object" && value?.value) {
    const newDate = new Date(value.value);
    const seconds = newDate.getTime() / 1000;

    return formatTimestamp(seconds);
  }
  return "-";
};
