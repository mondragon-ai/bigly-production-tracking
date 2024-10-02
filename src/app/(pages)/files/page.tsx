"use client";
import styles from "../../../components/Shared.module.css";
import {FileDetail} from "@/components/files/FileDetail";
import PageHeader from "@/components/shared/PageHeader";
import {FileList} from "@/components/shared/FileList";

export default function Files() {
  const handleFileUpload = (file: File) => {
    console.log("Uploaded file:", file);
    // Handle the file upload logic here
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Pick List Files"
        buttons={[
          {
            text: "UPLOAD FILE",
            tone: "success",
            onClick: handleFileUpload,
            icon: "link",
          },
        ]}
        date={""}
        badges={[]}
        staff={[]}
      />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <FileList headers={headers} items={items} />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          <FileDetail />
        </section>
      </main>
    </div>
  );
}

const headers = ["Name", "Status", "Date Added"];
const items = [
  {
    id: "1",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "1",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "1",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "1",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
];
