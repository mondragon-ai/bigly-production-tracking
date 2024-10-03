import Image from "next/image";
import styles from "./Jobs.module.css";
import {Button} from "../shared/Button";
import {useState} from "react";
import {StoreDocument} from "@/lib/types/settings";
import {Items} from "@/lib/types/jobs";
import {EmptyState} from "../images/EmptyState";

export const AddItems = ({
  handleSelectItem,
  stores,
}: {
  handleSelectItem: () => void;
  stores: StoreDocument[];
}) => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItems] = useState<Items[]>([]);
  const [store, setStore] = useState("");
  const [query, setQuery] = useState("");

  const openStoreModal = (s: string) => {
    setOpen(!isOpen);
  };

  const closeModal = (s: string) => {
    setStore(s);
    setOpen(!isOpen);
  };

  const handleSearch = () => {
    console.log({query, store});
    const curr_store = stores.map((s) => s.name == store);
    if (store.toLocaleUpperCase() == "BIGLY") {
      console.log("ALGOLIA");
    } else {
      console.log("SHOPIFY");
    }
  };

  return (
    <div className={styles.addItemsWrapper}>
      <header className={styles.searchWrapper}>
        <div className={styles.inputWrapper}>
          <label htmlFor="query">{`Search ${store} store`}</label>
          <input
            type="text"
            placeholder="Title, IDs, SKUs"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          text={"Search"}
          thin={true}
          tone={"success"}
          align={"center"}
          onClick={handleSearch}
        />
        <Button
          text={"Store"}
          thin={true}
          tone={"success"}
          align={"center"}
          onClick={openStoreModal}
        />
        {isOpen && stores && stores.length != 0 && (
          <div className={styles.storeModal}>
            {stores &&
              stores.map((s) => {
                return <div onClick={() => closeModal(s.name)}>{s.name}</div>;
              })}
          </div>
        )}
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
              <tr key={item.id} onClick={() => handleSelectItem()}>
                <td
                  style={{
                    textAlign: "center",
                    padding: "7px 10px",
                    verticalAlign: "bottom",
                  }}
                >
                  <Image
                    src={item.images.front_mockup || item.images.back_mockup}
                    alt={""}
                    width={100}
                    height={100}
                  />
                </td>
                <td>{item.sku}</td>
                <td>{item.type}</td>
                <td>{item.size}</td>
                <td>{item.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {
          <EmptyState
            icon="search"
            text="Please selet a store and start a search"
          />
        }
      </div>
    </div>
  );
};

const headers = ["SKU", "Type", "Size", "Color"];

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
