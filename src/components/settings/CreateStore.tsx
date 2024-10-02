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
