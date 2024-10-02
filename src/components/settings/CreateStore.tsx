import {StoreDocument} from "@/lib/types/settings";
import {Button} from "../shared/Button";
import styles from "./Users.module.css";
import {Dispatch, SetStateAction} from "react";

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
      <main>
        <div className={styles.inputWrapper}>
          <label htmlFor="first_name">Shopify Store</label>
          <input
            type="text"
            value={store?.name}
            onChange={(e) =>
              setStore((prev) => prev && {...prev, name: e.target.value})
            }
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="first_name">API Key</label>
          <input
            type="text"
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
            <span>{store?.sphat}</span>
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
