import Image from "next/image";
import {Badge} from "../shared/Badge";
import {Button} from "../shared/Button";
import styles from "./Jobs.module.css";
export const ItemDisplay = () => {
  return (
    <div className={styles.itemDisplayWrapper}>
      <header>
        <h4>SKU-1234-M-BLACK-AJ</h4>
        <Badge icon={"delivery"} text={"Pending"} tone={"magic"} />
      </header>
      <main>
        <MockupDesign />
        <div className={styles.column}>
          <div className={styles.box} style={{width: "32%"}}>
            <Image
              src={
                "https://cdn.shopify.com/s/files/1/0860/6305/5167/files/0c699b-3.myshopify_aa2b05f2-23b5-46ab-87a2-4b38a5ac37f9.png?v=1727380084"
              }
              width={500}
              height={500}
              alt={""}
            />
          </div>

          <div className={styles.box} style={{width: "32%"}}>
            <Image
              src={
                "https://cdn.shopify.com/s/files/1/0860/6305/5167/files/0c699b-3.myshopify_4ac5fee4-7c4f-4bda-88f0-d9c0a2deacda.png?v=1727380084"
              }
              width={500}
              height={500}
              alt={""}
            />
          </div>

          <div className={styles.box} style={{width: "32%"}}></div>
        </div>
      </main>
      <footer>
        <Button
          tone="descructive"
          icon="rejected"
          align="left"
          thin={true}
          text={"Report Error"}
        />
      </footer>
    </div>
  );
};

export const MockupDesign = () => {
  return (
    <div className={styles.box}>
      <button className={styles.toggle}>Front</button>
      <Image
        src={
          "https://cdn.shopify.com/s/files/1/0860/6305/5167/files/0c699b-3.myshopify.com_2Fmockup_2F1727379220312.png?v=1727380140"
        }
        width={500}
        height={500}
        alt={""}
      />
    </div>
  );
};
