"use client";
import Image from "next/image";
import {Badge} from "../shared/Badge";
import styles from "./Jobs.module.css";
import {Button} from "../shared/Button";
import {Items} from "@/lib/types/jobs";
import {useState} from "react";
import {InventoryDocument} from "@/lib/types/inventory";
import {badgeColor, badgeIcon} from "@/lib/utils/shared";

export const ItemDisplay = ({
  is_create,
  item,
  onClick,
}: {
  is_create: boolean;
  onClick: (id: string) => void;
  item: Items | InventoryDocument;
}) => {
  return (
    <div className={styles.itemDisplayWrapper}>
      <header>
        <h4>{item.sku}</h4>
        <Badge
          icon={badgeIcon(item.status)}
          text={item.status}
          tone={badgeColor(item.status)}
        />
        <Badge icon={"shopping-bag"} text={item.type} tone={"info"} />
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
            {item.images.front ? (
              <Image
                src={item.images.front}
                width={500}
                height={500}
                alt={""}
              />
            ) : (
              <div style={{height: "150px"}}></div>
            )}
          </div>

          <div className={styles.box} style={{width: "32%"}}>
            {item.images.back ? (
              <Image src={item.images.back} width={500} height={500} alt={""} />
            ) : (
              <div style={{height: "150px"}}></div>
            )}
          </div>

          <div className={styles.box} style={{width: "32%"}}>
            {item.images.sleeve ? (
              <Image
                src={item.images.sleeve}
                width={500}
                height={500}
                alt={""}
              />
            ) : (
              <div style={{height: "150px"}}></div>
            )}
          </div>
        </div>
      </main>
      <footer>
        {is_create ? (
          <Button
            onClick={() => onClick(item.id)}
            tone="descructive"
            icon="trash"
            align="left"
            thin={true}
            text={"Remove Item"}
          />
        ) : !is_create && !(item as any).has_error ? (
          <Button
            onClick={() => onClick(item.id)}
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

export const MockupDesign = ({item}: {item: Items | InventoryDocument}) => {
  const [isFront, setFront] = useState(false);
  return (
    <div className={styles.box}>
      <button className={styles.toggle} onClick={() => setFront(!isFront)}>
        {isFront ? "Front" : "Back"}
      </button>
      {item.images[isFront ? "front_mockup" : "back_mockup"] ? (
        <Image
          src={isFront ? item.images.front_mockup : item.images.back_mockup}
          width={500}
          height={500}
          alt={""}
        />
      ) : (
        <div style={{height: "150px"}}></div>
      )}
    </div>
  );
};
