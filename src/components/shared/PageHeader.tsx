"use client";
import {BadgeType, IconTypes, Staff} from "@/lib/types/shared";
import styles from "./Shared.module.css";
import localFont from "next/font/local";
import {Avatar} from "./Avatar";
import {Button} from "./Button";
import {Badge} from "./Badge";
import {Dispatch, SetStateAction, useRef} from "react";

type PageHeaderProps = {
  has_qr_code?: string;
  loading?: boolean;
  title: string;
  date: string;
  badges: BadgeType[];
  staff: Staff[];
  buttons: {
    onClick: ((e: any) => void) | undefined;
    text: string;
    tone: "" | "success" | "descructive";
    icon: IconTypes;
  }[];
  openStaff?: () => void;
  setPriority?: Dispatch<SetStateAction<boolean>>;
};

const geistSans = localFont({
  src: "../../app/fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const PageHeader = ({
  title,
  date,
  badges,
  staff,
  buttons,
  loading,
  openStaff,
  has_qr_code = "",
  setPriority,
}: PageHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = (e: React.MouseEvent) => {
    const button = buttons.find((b) => b.text === e.currentTarget.textContent);
    if (
      button &&
      button.onClick &&
      button.text !== "UPLOAD FILE" &&
      button.text !== "UPLOAD IMAGE"
    ) {
      button.onClick(e);
    } else if (
      (button && button.text == "UPLOAD FILE") ||
      (button && button.text == "UPLOAD IMAGE")
    ) {
      console.log("opened");
      fileInputRef.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("started");
    const btn = buttons.find(
      (b) => b.text == "UPLOAD FILE" || b.text == "UPLOAD IMAGE",
    );
    const file = e.target.files?.[0];
    if (file && btn?.onClick) {
      btn.onClick(file);
    }
  };

  const openQrCode = () => {
    console.log("OPEN QR CODE");
  };

  return (
    <header className={styles.pageHeaderWrapper}>
      <div className={styles.left}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          style={{visibility: "hidden"}}
        />
        <div>
          <h1 className={geistSans.className}>{title}</h1>
          {has_qr_code && <Badge icon={"qr-code"} text={""} tone={"success"} />}
          {setPriority && (
            <div className={styles.toggleWrapper}>
              <label>
                <input
                  type="checkbox"
                  onClick={() => setPriority((prev) => !prev)}
                />
                <span className={styles.fill}></span>
              </label>
            </div>
          )}
          {badges &&
            badges.map((badge, index) => (
              <Badge
                key={index}
                icon={badge.icon}
                text={badge.text}
                tone={badge.tone}
              />
            ))}
        </div>
        {date && <span>{date}</span>}
      </div>
      <div className={styles.right}>
        <div className={styles.staffWrapper} onClick={openStaff}>
          {staff.length > 4 && <p>{`+${staff.length - 4}`}</p>}
          {staff &&
            staff.map((s, i) => {
              if (i <= 4) {
                return <Avatar staff={null} key={i} />;
              }
            })}
        </div>
        {buttons &&
          buttons.map((button, index) => (
            <Button
              loading={loading}
              key={index}
              thin={true}
              text={button.text}
              tone={button.tone}
              align={"center"}
              icon={button.icon}
              onClick={handleButtonClick}
            />
          ))}
      </div>
    </header>
  );
};

export default PageHeader;
