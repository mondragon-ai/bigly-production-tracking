"use client";
import {useState} from "react";
import styles from "../shared/Shared.module.css";
import {Badge} from "../shared/Badge";

type CustomTableProps = {
  headers: string[];
  items: any[];
};

export const ItemsList = ({headers, items}: CustomTableProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id],
    );
  };

  const deleteSelected = () => {
    //   handleDelete(selectedIds);
    setSelectedIds([]); // Clear selection after delete
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
              <input type="checkbox" />
            </th>
            {headers &&
              headers.map((title, index) => {
                return <th key={index}>{title}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td
                style={{
                  textAlign: "center",
                  padding: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                />
              </td>
              <td>{item.sku}</td>
              <td>{item.size}</td>
              <td>{item.color}</td>
              <td>
                <Badge icon={"store"} text={"success"} tone={"success"} />
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
