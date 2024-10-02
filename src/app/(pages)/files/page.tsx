"use client";
import styles from "../../../components/Shared.module.css";
import {FileDetailCard} from "@/components/files/FileDetail";
import PageHeader from "@/components/shared/PageHeader";
import {FileList} from "@/components/shared/FileList";
import useFiles from "@/lib/hooks/useFiles";
import {StartingState} from "@/components/images/StartingState";

export default function Files() {
  const {
    files,
    loading,
    error,
    uploadFiles,
    fetchAndParseFile,
    file_detail,
    deleteFile,
  } = useFiles();

  const handleFileUpload = async (file: File) => {
    await uploadFiles(file);
  };

  const handleFileSelect = async (id: string) => {
    await fetchAndParseFile(id);
  };

  const handleDeleteFile = async (id: string) => {
    await deleteFile(id);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        loading={loading == "posting"}
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
          {file_detail ? (
            <FileDetailCard
              file_detail={file_detail}
              handleDeleteFile={handleDeleteFile}
            />
          ) : loading == "requesting" ? (
            <p>loading</p>
          ) : (
            <StartingState type="file" />
          )}
        </section>
      </main>
    </div>
  );
}

const headers = ["Name", "Status", "Date Added"];
