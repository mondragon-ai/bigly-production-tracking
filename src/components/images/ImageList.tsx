"use client";
import Image from "next/image";
import {Icon} from "../shared/Icon";
import styles from "./Images.module.css";
import {copyToClipBoard} from "@/app/shared";
import {ImageDocument} from "@/lib/types/images";
import toast from "react-hot-toast";
import {EmptyState} from "./EmptyState";
import {formatTimestamp} from "@/lib/utils/converter.tsx/time";

type CustomTableProps = {
  headers: string[];
  items: ImageDocument[];
  handleImageSelect: (id: string) => void;
};

export const ImageList = ({
  headers,
  items,
  handleImageSelect,
}: CustomTableProps) => {
  const handleCopy = (value: string) => {
    copyToClipBoard(value);
    toast.success("copied to clipboard");
  };
  return (
    <div className={styles.imageTableWrapper}>
      <table>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "center",
                padding: "0 10px",
                verticalAlign: "middle",
              }}
            >
              Image
            </th>
            {headers &&
              headers.map((title, index) => {
                return <th key={index}>{title}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item, index) => (
              <tr key={index} onClick={() => handleImageSelect(item.id)}>
                <td
                  style={{
                    textAlign: "center",
                    padding: "7px 10px",
                    verticalAlign: "bottom",
                  }}
                >
                  <Image
                    src={item.url || ""}
                    alt={""}
                    width={100}
                    height={100}
                  />
                </td>
                <td>{item.name}</td>
                <td>{formatTimestamp(item.created_at)}</td>
                <td>
                  <button
                    className={styles.btn}
                    role="button"
                    onClick={() => handleCopy(item.url)}
                  >
                    <Icon icon={"link"} tone={"magic"} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!items || items.length == 0 ? <EmptyState /> : null}
    </div>
  );
};
