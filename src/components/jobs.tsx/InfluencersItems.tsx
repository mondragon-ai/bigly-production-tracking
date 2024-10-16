"use client";
import {Badge} from "../shared/Badge";
import {Influencer} from "@/lib/types/jobs";
import styles from "../shared/Shared.module.css";
import {badgeColor, badgeIcon} from "@/app/shared";
import {capitalizeWords} from "@/lib/utils/converter.tsx/text";

type CustomTableProps = {
  headers: string[];
  items: Influencer[];
};

export const InfluencersItems = ({headers, items}: CustomTableProps) => {
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
                <tr key={item.id}>
                  <td
                    style={{
                      textAlign: "center",
                      padding: "0 10px",
                      verticalAlign: "middle",
                    }}
                  ></td>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.note}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
