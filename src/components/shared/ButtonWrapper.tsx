"use client";
import {IconTypes} from "@/lib/types/shared";
import styles from "./Shared.module.css";
import {Icon} from "./Icon";

const headers = ["Name", "Email", "Position", "Role"];

export const MobileActions = ({
  buttons,
}: {
  buttons: {
    onClick: ((e: any) => void) | undefined;
    text: string;
    tone: "" | "success" | "descructive";
    icon: IconTypes;
  }[];
}) => {
  return (
    <div className={styles.storeModal}>
      {buttons &&
        buttons.map((b) => {
          return (
            <div className={styles.mobileActions} onClick={b.onClick}>
              <Icon
                icon={b.icon}
                tone={b.tone == "descructive" ? "critical" : "success"}
              />
              {b.text}
            </div>
          );
        })}
    </div>
  );
};
