import {Badge} from "../shared/Badge";
import {Button} from "../shared/Button";
import styles from "./Files.module.css";

export const FileDetail = () => {
  return (
    <div className={styles.fileDetailWrapper}>
      <header>
        <h5>Pick-List.csv</h5>
        <Button
          text={"Generate"}
          thin={true}
          tone={"success"}
          align={"center"}
        />
      </header>

      <div className={styles.fileTableWrapper}>
        <table>
          <thead>
            <tr>
              {headers &&
                headers.map((title, index) => {
                  return (
                    <th
                      key={index}
                      style={{
                        textAlign: "left",
                        padding: index == 0 ? "0 1rem" : "7px 0",
                        verticalAlign: "middle",
                      }}
                    >
                      {title}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td
                  style={{
                    textAlign: "left",
                    padding: "0 1rem",
                    verticalAlign: "middle",
                  }}
                >
                  {item.print}
                </td>
                <td>{item.sku}</td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const headers = ["Print SKU", "Item SKU", "Type"];

const items = [
  {
    id: "1",
    print: "1234-S-3XL",
    sku: "AJ-SKU-1234-M-BLK",
    type: "Shirt",
  },
  {
    id: "2",
    print: "1234-S-3XL",
    sku: "AJ-SKU-1234-M-BLK",
    type: "Shirt",
  },
  {
    id: "3",
    print: "1234-S-3XL",
    sku: "AJ-SKU-1234-M-BLK",
    type: "Shirt",
  },
  {
    id: "4",
    print: "1234-S-3XL",
    sku: "AJ-SKU-1234-M-BLK",
    type: "Shirt",
  },
  {
    id: "5",
    print: "1234-S-3XL",
    sku: "AJ-SKU-1234-M-BLK",
    type: "Shirt",
  },
];
