"use client";
import {Badge} from "./Badge";
import {useState} from "react";
import styles from "./Shared.module.css";
import {FileDocument} from "@/lib/types/files";

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
            <tr key={item.id} onClick={() => handleFileSelect(item.id)}>
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
              <td>{item.name}</td>
              <td>
                <Badge
                  icon={item.status == "generated" ? "badge-check" : "clock"}
                  text={item.status}
                  tone={item.status == "generated" ? "success" : "magic"}
                />
              </td>
              <td>{item.added}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
