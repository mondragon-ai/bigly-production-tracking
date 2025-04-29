import {useState} from "react";
import {formatWithCommas} from "@/lib/utils/converter.tsx/numbers";
import {useWidth} from "@/lib/hooks/useWidth";
import tableStyles from "../../../../../components/files/Files.module.css";
import styles from "../../../../../components/Shared.module.css";
import {SortingColumn} from "@/components/analytics/tables/SortingColumn";

type Header = {name: string; key: string};
type Row = Record<string, any>;

interface RowTableProps {
  headers: Header[];
  rows: Row[];
}

export const RowTable = ({headers, rows}: RowTableProps) => {
  const [selectedColumn, setSelectedColumn] = useState<{
    name: string;
    fromHighest: boolean;
  }>({
    name: headers[0]?.key ?? "",
    fromHighest: true,
  });

  const width = useWidth();

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
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  style={{padding: "7px 1rem", textAlign: "center"}}
                >
                  No data available
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx}>
                  {headers.map(({key}, i) => (
                    <td
                      key={i}
                      className={styles.tableCell}
                      style={{padding: "7px 1rem"}}
                    >
                      {renderCell(row[key])}
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
  if (typeof value === "string" || typeof value === "boolean") return value;
  if (value instanceof Date) return value.toLocaleDateString();
  return "-";
};
