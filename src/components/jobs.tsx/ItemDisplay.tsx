"use client";
import Image from "next/image";
import {Badge} from "../shared/Badge";
import styles from "./Jobs.module.css";
import {Button} from "../shared/Button";
import {Items} from "@/lib/types/jobs";
import {useState} from "react";

export const ItemDisplay = ({
  is_create,
  item,
  handleReportError,
}: {
  is_create: boolean;
  handleReportError: (id: string) => void;
  item: Items;
}) => {
  console.log({item});
  return (
    <div className={styles.itemDisplayWrapper}>
      <header>
        <h4>{item.sku}</h4>
        <Badge
          icon={
            item.status == "pending"
              ? "delivery"
              : item.status == "completed"
              ? "badge-check"
              : "rejected"
          }
          text={item.status}
          tone={
            item.status == "pending"
              ? "magic"
              : item.status == "completed"
              ? "success"
              : "critical"
          }
        />
      </header>
      <main>
        <div className={styles.txt}>
          <span>
            <strong>Size:</strong> {item.size}
          </span>
          <span>
            <strong>Color:</strong> {item.color}
          </span>
        </div>
        <MockupDesign item={item} />
        <div className={styles.column}>
          <div className={styles.box} style={{width: "32%"}}>
            <Image src={item.images.front} width={500} height={500} alt={""} />
          </div>

          <div className={styles.box} style={{width: "32%"}}>
            <Image src={item.images.back} width={500} height={500} alt={""} />
          </div>

          <div className={styles.box} style={{width: "32%"}}>
            <Image src={item.images.sleeve} width={500} height={500} alt={""} />
          </div>
        </div>
      </main>
      <footer>
        {is_create ? (
          <Button
            tone="descructive"
            icon="trash"
            align="left"
            thin={true}
            text={"Remove Item"}
          />
        ) : !is_create && !item.has_error ? (
          <Button
            onClick={() => handleReportError(item.id)}
            tone="descructive"
            icon="rejected"
            align="left"
            thin={true}
            text={"Report Error"}
          />
        ) : null}
      </footer>
    </div>
  );
};

export const MockupDesign = ({item}: {item: Items}) => {
  const [isFront, setFront] = useState(false);
  return (
    <div className={styles.box}>
      <button className={styles.toggle} onClick={() => setFront(!isFront)}>
        {isFront ? "Front" : "Back"}
      </button>
      <Image
        src={isFront ? item.images.front_mockup : item.images.back_mockup}
        width={500}
        height={500}
        alt={""}
      />
    </div>
  );
};
