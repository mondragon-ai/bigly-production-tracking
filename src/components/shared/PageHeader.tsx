"use client";
import {BadgeType, IconTypes, LoadingTypes, Staff} from "@/lib/types/shared";
import {SkeletonBadge, SkeletonText} from "../skeleton/SkeletonText";
import {Dispatch, SetStateAction, useRef, useState} from "react";
import styles from "./Shared.module.css";
import localFont from "next/font/local";
import {Avatar} from "./Avatar";
import {Button} from "./Button";
import {Badge} from "./Badge";
import {Icon} from "./Icon";
import {AddStaff} from "./AddStaff";

type PageHeaderProps = {
  has_qr_code?: string;
  loading?: LoadingTypes;
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
  set_loaders?: boolean;
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
  set_loaders = false,
  has_qr_code = "",
  openStaff,
  setPriority,
}: PageHeaderProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modal, openModal] = useState<"staff" | "buttons" | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = (e: React.MouseEvent) => {
    const button = buttons.find((b) => b.text === e.currentTarget.textContent);
    openModal(null);
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
    const printWindow = window.open("", "", "height=500, width=500");
    if (printWindow) {
      printWindow.document.write(`
          <html>
            <head>
              <title>${title}</title>
            </head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
              <img src="${has_qr_code}" alt="Job QR Code" style="max-width:100%; max-height:100%;" />
            </body>
          </html>
        `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <header className={styles.pageHeaderWrapper}>
      <div className={styles.left}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          style={{visibility: "hidden", display: "none"}}
        />
        <div>
          {loading == "loading" && set_loaders ? (
            <SkeletonText width={100} header={true} />
          ) : (
            <h1 className={geistSans.className}>{title}</h1>
          )}
          {loading == "loading" &&
          set_loaders &&
          has_qr_code ? null : has_qr_code ? (
            <button className={styles.btn} role="button" onClick={openQrCode}>
              <Icon icon={"qr-code"} tone={"magic"} />
            </button>
          ) : null}
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
          <div className={styles.mobileBadgeWrapper}>
            {loading == "loading" && set_loaders && badges ? (
              <SkeletonBadge />
            ) : badges ? (
              badges.map((badge, index) => (
                <Badge
                  key={index}
                  icon={badge.icon}
                  text={badge.text}
                  tone={badge.tone}
                />
              ))
            ) : null}
          </div>
        </div>
        {loading == "loading" && set_loaders && date ? (
          <SkeletonText color="#cccccc" width={30} header={true} />
        ) : date ? (
          <span>{date}</span>
        ) : null}
      </div>

      <div className={styles.mobileBtnWrappers}>
        {modal == "buttons" && (
          <div className={styles.storeModal}>
            {buttons &&
              buttons.map((b) => {
                return (
                  <div
                    className={styles.mobileActions}
                    onClick={handleButtonClick}
                  >
                    <Icon
                      icon={b.icon}
                      tone={b.tone == "descructive" ? "critical" : "success"}
                    />
                    {b.text}
                  </div>
                );
              })}
          </div>
        )}
        {modal == "staff" && (
          <AddStaff
            can_select={false}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            staff={staff}
          />
        )}
        {staff && staff.length ? (
          <button
            className={styles.btn}
            role="button"
            onClick={() => openModal((p) => (p ? null : "staff"))}
            style={{marginRight: "5px"}}
          >
            <Icon icon={"add-user"} tone={"magic"} />
          </button>
        ) : null}

        <button
          className={styles.btn}
          role="button"
          onClick={() => openModal((p) => (p ? null : "buttons"))}
        >
          <Icon icon={"wand"} tone={"magic"} />
        </button>
      </div>
      <div className={styles.right}>
        {loading == "loading" && set_loaders && staff ? (
          <SkeletonBadge />
        ) : (
          <div className={styles.staffWrapper} onClick={openStaff}>
            {staff.length > 4 && <p>{`+${staff.length - 4}`}</p>}
            {staff &&
              staff.map((s, i) => {
                if (i <= 4) {
                  return <Avatar staff={s} key={i} />;
                }
              })}
          </div>
        )}
        {buttons &&
          buttons.map((button, index) => (
            <Button
              loading={loading == "requesting" || loading == "posting"}
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
