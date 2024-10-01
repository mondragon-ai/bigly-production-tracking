"use client";
import styles from "./Jobs.module.css";
import {Button} from "../shared/Button";
import {useState} from "react";

export const AddItem = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
    // Additional validation logic
  };

  return (
    <div className={styles.itemDisplayWrapper}>
      <header>
        <h4>SKU-1234-M-BLACK-AJ</h4>
      </header>
      <main>
        <div className={styles.txt}>
          <span>
            <strong>Size:</strong> M
          </span>
          <span>
            <strong>Color:</strong> Black
          </span>
        </div>

        <div className={styles.selectWrapper}>
          <input type="text" />
        </div>
        <div className={styles.selectWrapper}>
          <select id="standard-select">
            {colors &&
              colors.map((c, i) => {
                return (
                  <option key={i} value={c}>
                    {c}
                  </option>
                );
              })}
          </select>
          <select id="standard-select">
            {sizes &&
              sizes.map((s, i) => {
                return (
                  <option key={i} value={s}>
                    {s}
                  </option>
                );
              })}
          </select>
        </div>

        <div className={styles.box}>
          {/* <Image
        src={
          "https://cdn.shopify.com/s/files/1/0860/6305/5167/files/0c699b-3.myshopify.com_2Fmockup_2F1727379220312.png?v=1727380140"
        }
        width={500}
        height={500}
        alt={""}
      /> */}
          <div className={styles.fileUpload}>
            <h3> {selectedName || "Click box to upload"}</h3>
            <p>Maximun file size 10mb</p>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button className={styles.toggle}>Front</button>
        </div>
        <div className={styles.column}>
          <div className={styles.box} style={{width: "32%"}}>
            <div className={styles.fileUpload}>
              <h3> {selectedName || "Click box to upload"}</h3>
              <p>Maximun file size 10mb</p>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>

          <div className={styles.box} style={{width: "32%"}}>
            <div className={styles.fileUpload}>
              <h3> {selectedName || "Click box to upload"}</h3>
              <p>Maximun file size 10mb</p>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>

          <div className={styles.box} style={{width: "32%"}}>
            <div className={styles.fileUpload}>
              <h3> {selectedName || "Click box to upload"}</h3>
              <p>Maximun file size 10mb</p>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Button
          tone="success"
          icon="floppy"
          align="left"
          thin={true}
          text={"Create Item"}
        />
      </footer>
    </div>
  );
};

const colors = ["Red", "Black"];
const sizes = ["S", "M", "L", "XL"];
