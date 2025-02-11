"use client";
import {Badge} from "../shared/Badge";
import {Items} from "@/lib/types/jobs";
import styles from "../shared/Shared.module.css";
import {badgeColor, badgeIcon} from "@/app/shared";
import {InventoryDocument} from "@/lib/types/inventory";
import {capitalizeWords} from "@/lib/utils/converter.tsx/text";

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
          {items &&
            items.map((item, index) => {
              return (
                <tr key={item.id} onClick={() => handleSelectItem(item.id)}>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "0 10px",
                      verticalAlign: "middle",
                    }}
                  ></td>
                  <td>{item.sku}</td>
                  <td>{item.size}</td>
                  <td>{item.color}</td>
                  <td>
                    <Badge
                      icon={badgeIcon(item.status)}
                      text={capitalizeWords(item.status)}
                      tone={badgeColor(item.status)}
                    />
                  </td>
                  <td>{item.type}</td>
                  <td>{item.store}</td>
                  {is_inventory ? (
                    <td style={{textAlign: "left"}}>
                      {Number((item as any).inventory_levl)}
                    </td>
                  ) : null}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
