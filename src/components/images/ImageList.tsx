"use client";
import {useState} from "react";
import styles from "./Images.module.css";
import Image from "next/image";
import {Icon} from "../shared/Icon";

type CustomTableProps = {
  headers: string[];
  items: any[];
};

export const ImageList = ({headers, items}: CustomTableProps) => {
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
    <div className={styles.imageTableWrapper}>
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
              Image
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
                  padding: "7px 10px",
                  verticalAlign: "bottom",
                }}
              >
                <Image
                  src={
                    "https://cdn.shopify.com/s/files/1/0860/6305/5167/files/0c699b-3.myshopify_aa2b05f2-23b5-46ab-87a2-4b38a5ac37f9.png?v=1727380084"
                  }
                  alt={""}
                  width={100}
                  height={100}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.added}</td>
              <td>
                <div className={styles.btn}>
                  <Icon icon={"link"} tone={"magic"} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
