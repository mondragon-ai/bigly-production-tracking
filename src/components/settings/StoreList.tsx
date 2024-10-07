import styles from "./Users.module.css";
import Image from "next/image";
import {Icon} from "../shared/Icon";
import {StoreDocument} from "@/lib/types/settings";
import {getInitials, truncateString} from "@/lib/utils/converter.tsx/text";
import {formatTimestamp} from "@/lib/utils/time";

type StoreListProps = {
  headers: string[];
  items: StoreDocument[];
  selectItem: (id: string, type: "store" | "staff") => void;
};

export const StoreList = ({headers, items, selectItem}: StoreListProps) => {
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
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center",
                display: "flex",
              }}
            ></th>
            {headers &&
              headers.map((title, index) => {
                return <th key={index}>{title}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item, index) => (
              <tr key={item.id} onClick={() => selectItem(item.id, "store")}>
                <td
                  style={{
                    textAlign: "center",
                    padding: "7px 10px",
                    verticalAlign: "middle",
                    alignContent: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    display: "flex",
                  }}
                >
                  <div
                    className={styles.box}
                    style={{width: "20px", height: "20px"}}
                  >
                    {getInitials(item.name)}
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{truncateString(item.sphat, 20)}</td>
                <td>{formatTimestamp(item.created_at || 0)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
