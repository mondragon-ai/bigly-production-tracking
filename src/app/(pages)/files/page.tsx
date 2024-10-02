"use client";
import styles from "../../../components/Shared.module.css";
import {FileDetailCard} from "@/components/files/FileDetail";
import PageHeader from "@/components/shared/PageHeader";
import {FileList} from "@/components/shared/FileList";
import useFiles from "@/lib/hooks/useFiles";

export default function Files() {
  const {files, loading, error, uploadFiles, fetchAndParseFile, file_detail} =
    useFiles();

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
            icon: "upload",
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
            items={files}
          />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {file_detail && <FileDetailCard file_detail={file_detail} />}
        </section>
      </main>
    </div>
  );
}

const headers = ["Name", "Status", "Date Added"];
