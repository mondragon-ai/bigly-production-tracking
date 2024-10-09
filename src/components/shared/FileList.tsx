"use client";
import {Badge} from "./Badge";
import {useState} from "react";
import styles from "./Shared.module.css";
import {FileDocument} from "@/lib/types/files";
import {EmptyState} from "../images/EmptyState";
import {formatTimestamp} from "@/lib/utils/converter.tsx/time";
import {formatWithCommas} from "@/lib/utils/converter.tsx/numbers";

type CustomTableProps = {
  headers: string[];
  items: FileDocument[];
  handleFileSelect: (id: string) => void;
};

export const FileList = ({
  headers,
  items,
  handleFileSelect,
}: CustomTableProps) => {
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "center",
                padding: "0 10px",
                verticalAlign: "middle",
              }}
            >
              {/* <input type="checkbox" /> */}
            </th>
            {headers &&
              headers.map((title, index) => {
                return <th key={index}>{title}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item, index) => (
              <tr key={item.id} onClick={() => handleFileSelect(item.id)}>
                <td
                  style={{
                    textAlign: "center",
                    padding: "0 10px",
                    verticalAlign: "middle",
                  }}
                >
                  {/* <input
                    type="checkbox"
                    checked={false}
                    onChange={() => {}}
                  /> */}
                </td>
                <td>{item.name}</td>
                <td>
                  <Badge
                    icon={item.status == "generated" ? "badge-check" : "clock"}
                    text={item.status}
                    tone={item.status == "generated" ? "success" : "magic"}
                  />
                </td>
                <td>{formatWithCommas(item.total_items)}</td>
                <td>{formatTimestamp(item.created_at)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!items || items.length == 0 ? <EmptyState /> : null}
    </div>
  );
};
