import {Button} from "../shared/Button";
import styles from "./Users.module.css";

export const CreateStore = () => {
  return (
    <div className={styles.detailWrapper}>
      <main>
        <div className={styles.inputWrapper}>
          <label htmlFor="first_name">Shopify Store</label>
          <input type="text" />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="first_name">API Key</label>
          <input type="text" />
        </div>
      </main>
      <footer>
        <Button
          text={"Delete Image"}
          thin={true}
          tone={"descructive"}
          align={"left"}
          icon="trash"
        />
      </footer>
    </div>
  );
};
