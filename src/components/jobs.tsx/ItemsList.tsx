"use client";
import {useState} from "react";
import styles from "../shared/Shared.module.css";
import {Badge} from "../shared/Badge";
import {Items} from "@/lib/types/jobs";
import {InventoryDocument} from "@/lib/types/inventory";
import {badgeColor, badgeIcon} from "@/lib/utils/shared";

type CustomTableProps = {
  headers: string[];
  items: Items[] | InventoryDocument[];
  handleSelectItem: (id: string) => void;
  is_inventory?: boolean;
};

export const ItemsList = ({
  headers,
  items,
  handleSelectItem,
  is_inventory = false,
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
          {items.map((item, index) => {
            console.log(typeof (item as any).inventory_levl);
            return (
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
                    icon={badgeIcon(item.status)}
                    text={item.status}
                    tone={badgeColor(item.status)}
                  />
                </td>
                <td>{item.type}</td>
                <td>{item.store}</td>
                {is_inventory ? (
                  <td>{Number((item as any).inventory_levl)}</td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
