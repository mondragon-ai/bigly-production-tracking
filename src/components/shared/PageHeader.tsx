"use client";
import localFont from "next/font/local";
import {Avatar} from "./Avatar";
import {Badge} from "./Badge";
import {Button} from "./Button";
import styles from "./Shared.module.css";
import {IconTypes} from "@/lib/types/shared";
import {useRef} from "react";

type PageHeaderProps = {
  title: string;
  date: string;
  badges: {
    icon: IconTypes;
    text: string;
    tone: "critical" | "success" | "info" | "magic";
  }[];
  staff: {
    name: string;
    id: string;
    email: string;
  }[];
  buttons: {
    onClick: ((e: any) => void) | undefined;
    text: string;
    tone: "" | "success" | "descructive";
    icon: IconTypes;
  }[];
};

const geistSans = localFont({
  src: "../../app/fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const PageHeader = ({title, date, badges, staff, buttons}: PageHeaderProps) => {
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
        <div className={styles.staffWrapper}>
          {staff.length > 4 && <p>{`+${staff.length - 4}`}</p>}
          {staff &&
            staff.map((s, i) => {
              if (i <= 4) {
                return <Avatar key={i} />;
              }
            })}
        </div>
        {buttons &&
          buttons.map((button, index) => (
            <Button
              key={index}
              thin={true}
              text={button.text}
              tone={button.tone}
              align={"center"}
              icon={button.icon}
              //   onClick={button.onClick}
              onClick={handleButtonClick}
            />
          ))}
      </div>
    </header>
  );
};

export default PageHeader;