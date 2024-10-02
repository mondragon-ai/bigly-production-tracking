import {StoreDocument} from "@/lib/types/settings";
import {Button} from "../shared/Button";
import styles from "./Users.module.css";

export const CreateStore = ({store}: {store: StoreDocument | null}) => {
  return (
    <div className={styles.detailWrapper}>
      <main>
        <div className={styles.inputWrapper}>
          <label htmlFor="first_name">Shopify Store</label>
          <input type="text" value={store?.name} />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="first_name">API Key</label>
          <input type="text" value={store?.sphat} />
        </div>
      </main>
      <footer>
        <Button
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

export const StoreCard = ({store}: {store: StoreDocument | null}) => {
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
