"use client";
import {useState} from "react";
import styles from "../shared/Shared.module.css";
import {Badge} from "../shared/Badge";
import {Items} from "@/lib/types/jobs";

type CustomTableProps = {
  headers: string[];
  items: Items[];
  handleSelectItem: (id: string) => void;
};

export const ItemsList = ({
  headers,
  items,
  handleSelectItem,
}: CustomTableProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id],
    );
  };

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
          {items.map((item, index) => (
            <tr key={item.id} onClick={() => handleSelectItem(item.id)}>
              <td
                style={{
                  textAlign: "center",
                  padding: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                {/* <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                /> */}
              </td>
              <td>{item.sku}</td>
              <td>{item.size}</td>
              <td>{item.color}</td>
              <td>
                <Badge
                  icon={
                    item.status == "pending"
                      ? "delivery"
                      : item.status == "completed"
                      ? "badge-check"
                      : "rejected"
                  }
                  text={item.status}
                  tone={
                    item.status == "pending"
                      ? "magic"
                      : item.status == "completed"
                      ? "success"
                      : "critical"
                  }
                />
              </td>
              <td>{item.type}</td>
              <td>{item.store}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
