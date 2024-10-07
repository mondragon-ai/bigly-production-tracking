import {StoreDocument} from "@/lib/types/settings";
import {Button} from "../shared/Button";
import styles from "./Users.module.css";
import {Dispatch, SetStateAction} from "react";
import {truncateString} from "@/lib/utils/converter.tsx/text";

export const CreateStore = ({
  store,
  createItem,
  setStore,
}: {
  store: StoreDocument | null;
  setStore: Dispatch<SetStateAction<StoreDocument | null>>;
  createItem: (type: "store" | "staff") => void;
}) => {
  return (
    <div className={styles.detailWrapper}>
      <main style={{marginTop: "0.5rem"}}>
        <div className={styles.inputWrapper}>
          <label htmlFor="name">Shopify Store</label>
          <input
            type="text"
            name="name"
            value={store?.name}
            onChange={(e) =>
              setStore((prev) => prev && {...prev, name: e.target.value})
            }
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="domain">Shopify URL</label>
          <input
            type="text"
            name="domain"
            value={store?.domain}
            onChange={(e) =>
              setStore((prev) => prev && {...prev, domain: e.target.value})
            }
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="shpat">API Key</label>
          <input
            type="text"
            name="shpat"
            value={store?.sphat}
            onChange={(e) =>
              setStore((prev) => prev && {...prev, sphat: e.target.value})
            }
          />
        </div>
      </main>
      <footer>
        <Button
          onClick={() => createItem("store")}
          text={"Add Store"}
          thin={true}
          tone={"success"}
          align={"left"}
          icon="floppy"
        />
      </footer>
    </div>
  );
};

export const StoreCard = ({
  store,
  deleteItem,
}: {
  store: StoreDocument | null;
  deleteItem: (type: "store" | "staff") => void;
}) => {
  return (
    <div className={styles.detailWrapper}>
      <main>
        <div className={styles.inputWrapper}>
          <label htmlFor="first_name">Shopify Store</label>
          <div
            className={styles.box}
            style={{
              width: "100%",
              padding: "12px 20px",
              margin: "0px 0",
              display: "inline-block",
              border: " 2px solid var(--foreground)",
              borderRadius: "4px",
              color: " var(--primary-text)",
              boxSizing: "border-box",
              backgroundColor: "var(--background)",
            }}
          >
            <span>{store?.name}</span>
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="first_name">My Shopify URL</label>
          <div
            className={styles.box}
            style={{
              width: "100%",
              padding: "12px 20px",
              margin: "0px 0",
              display: "inline-block",
              border: " 2px solid var(--foreground)",
              borderRadius: "4px",
              color: " var(--primary-text)",
              boxSizing: "border-box",
              backgroundColor: "var(--background)",
            }}
          >
            <span>{store?.domain || "-"}</span>
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="first_name">API Key</label>
          <div
            className={styles.box}
            style={{
              width: "100%",
              padding: "12px 20px",
              margin: "0px 0",
              display: "inline-block",
              border: " 2px solid var(--foreground)",
              borderRadius: "4px",
              color: " var(--primary-text)",
              boxSizing: "border-box",
              backgroundColor: "var(--background)",
            }}
          >
            <span>{truncateString(`${store?.sphat}`, 35)}</span>
          </div>
        </div>
      </main>
      <footer>
        <Button
          onClick={() => deleteItem("store")}
          text={"Delete Store"}
          thin={true}
          tone={"descructive"}
          align={"left"}
          icon="trash"
        />
      </footer>
    </div>
  );
};
