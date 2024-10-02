"use client";
import styles from "../../../components/Shared.module.css";
import {FileDetail} from "@/components/files/FileDetail";
import PageHeader from "@/components/shared/PageHeader";
import {FileList} from "@/components/shared/FileList";
import useFiles from "@/lib/hooks/useFiles";

export default function Files() {
  const {files, loading, error, uploadFiles, fetchAndParseFile} = useFiles();

  const handleFileUpload = async (file: File) => {
    console.log("Uploaded file:", file);
    await uploadFiles(file);
  };

  const handleFileSelect = async (id: string) => {
    console.log({id});
    await fetchAndParseFile(id);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        loading={loading}
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
          <FileList
            handleFileSelect={handleFileSelect}
            headers={headers}
            items={items}
          />
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
    id: "2",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "3",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "4",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
];
