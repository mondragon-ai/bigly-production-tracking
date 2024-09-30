import Image from "next/image";
import {Button} from "../shared/Button";
import styles from "./Images.module.css";

export const ImageDetail = () => {
  return (
    <div className={styles.imageDetailWrapper}>
      <header>
        <h5>iwbeFile_name.png</h5>
        <Button
          text={"Delete Image"}
          thin={true}
          tone={"descructive"}
          align={"left"}
          icon="trash"
        />
      </header>

      <main>
        <div className={styles.box}>
          <Image
            src={
              "https://cdn.shopify.com/s/files/1/0860/6305/5167/files/0c699b-3.myshopify.com_2Fmockup_2F1727379220312.png?v=1727380140"
            }
            width={500}
            height={500}
            alt={""}
          />
        </div>
      </main>
    </div>
  );
};
