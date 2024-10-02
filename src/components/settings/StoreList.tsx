import styles from "./Users.module.css";
import Image from "next/image";
import {Icon} from "../shared/Icon";
import {StoreDocument} from "@/lib/types/settings";
import {getInitials} from "@/lib/utils/converter.tsx/text";

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
          {items.map((item, index) => (
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
              <td>{item.sphat}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
