import Image from "next/image";
import styles from "./Jobs.module.css";
import {Button} from "../shared/Button";

export const AddItems = () => {
  return (
    <div className={styles.addItemsWrapper}>
      <header className={styles.searchWrapper}>
        <input type="text" />
        <Button text={"Search"} thin={true} tone={"success"} align={"center"} />
        <Button text={"Store"} thin={true} tone={"success"} align={"center"} />
      </header>
      <div className={styles.itemsTableWrapper}>
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
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>{item.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const headers = ["SKU", "Name", "Size", "Color"];

const items = [
  {
    id: "1",
    sku: "SKU-DESIGN-CLR-SIZE",
    size: "M",
    color: "Black",
    type: "shirt",
    name: "1776 Star",
  },
  {
    id: "1",
    sku: "SKU-DESIGN-CLR-SIZE",
    size: "M",
    color: "Black",
    type: "shirt",
    name: "1776 Star",
  },
];
