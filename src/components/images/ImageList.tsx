"use client";
import Image from "next/image";
import {Icon} from "../shared/Icon";
import styles from "./Images.module.css";
import {copyToClipBoard} from "@/lib/utils/shared";
import {ImageDocument} from "@/lib/types/images";
import toast from "react-hot-toast";

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
          {items.map((item, index) => (
            <tr key={index} onClick={() => handleImageSelect(item.id)}>
              <td
                style={{
                  textAlign: "center",
                  padding: "7px 10px",
                  verticalAlign: "bottom",
                }}
              >
                <Image
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/bigly-server.appspot.com/o/images%2Fuploads%2F1727879269134_Aundrel%20PAST%20Winner%20Banner%20Email.png?alt=media&token=68373442-084a-4418-95d8-9e9096cac4ca"
                  }
                  alt={""}
                  width={100}
                  height={100}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.added}</td>
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
    </div>
  );
};
