"use client";
import Image from "next/image";
import {Badge} from "../shared/Badge";
import styles from "./Jobs.module.css";
import {Button} from "../shared/Button";
import {Items} from "@/lib/types/jobs";
import {useState} from "react";
import {InventoryDocument} from "@/lib/types/inventory";
import {badgeColor, badgeIcon} from "@/lib/utils/shared";
import {Icon} from "../shared/Icon";

export const ItemDisplay = ({
  is_create,
  item,
  onClick,
  has_qr_code,
}: {
  is_create: boolean;
  onClick: (id: string) => void;
  item: Items | InventoryDocument;
  has_qr_code?: string;
}) => {
  const openQrCode = () => {
    // Create a new window to print the image
    const printWindow = window.open("", "", "height=500, width=500");
    if (printWindow) {
      printWindow.document.write(`
          <html>
            <head>
              <title>${item.sku}</title>
            </head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
              <img src="${has_qr_code}" alt="Item QR Code" style="max-width:100%; max-height:100%;" />
            </body>
          </html>
        `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className={styles.itemDisplayWrapper}>
      <header>
        <div>
          <h4>{item.sku}</h4>
          <Badge
            icon={badgeIcon(item.status)}
            text={item.status}
            tone={badgeColor(item.status)}
          />
          <Badge icon={"shopping-bag"} text={item.type} tone={"info"} />
        </div>
        {has_qr_code && (
          <button className={styles.btn} role="button" onClick={openQrCode}>
            <Icon icon={"qr-code"} tone={"magic"} />
          </button>
        )}
      </header>
      <main>
        <div className={styles.txt}>
          <span>
            <strong>{item.size}</strong> / <strong>{item.color}</strong> -{" "}
            {has_qr_code && (
              <strong>{(item as any).inventory_levl} units</strong>
            )}
          </span>
          {has_qr_code && (
            <span>
              <strong>{(item as InventoryDocument).location.room}</strong> /{" "}
              <strong>{(item as InventoryDocument).location.shelf}</strong>
            </span>
          )}
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
  const [isFront, setFront] = useState(true);
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
