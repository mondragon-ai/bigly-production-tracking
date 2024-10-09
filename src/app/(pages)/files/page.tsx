"use client";
import {SkeletonDetail, SkeletonList} from "@/components/skeleton/SkeletonList";
import {StartingState} from "@/components/images/StartingState";
import {FileDetailCard} from "@/components/files/FileDetail";
import styles from "../../../components/Shared.module.css";
import PageHeader from "@/components/shared/PageHeader";
import {FileList} from "@/components/shared/FileList";
import useFiles from "@/lib/hooks/useFiles";

export default function Files() {
  const {
    files,
    loading,
    error,
    file_detail,
    uploadFiles,
    fetchAndParseFile,
    deleteFile,
    genreateJobs,
  } = useFiles();

  const handleGenerate = (id: string) => {
    genreateJobs(id);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        set_loaders={false}
        loading={loading}
        title="Pick List Files"
        buttons={[
          {
            text: "UPLOAD FILE",
            tone: "success",
            onClick: uploadFiles,
            icon: "upload",
          },
        ]}
        date={""}
        badges={[]}
        staff={[]}
      />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          {loading == "loading" ? (
            <SkeletonList width={100} />
          ) : (
            <FileList
              handleFileSelect={fetchAndParseFile}
              headers={headers}
              items={files}
            />
          )}
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {file_detail ? (
            <FileDetailCard
              file_detail={file_detail}
              handleGenerate={handleGenerate}
              handleDeleteFile={deleteFile}
            />
          ) : loading == "requesting" || loading == "loading" ? (
            <SkeletonDetail width={100} />
          ) : (
            <StartingState type="file" />
          )}
        </section>
      </main>
    </div>
  );
}

const headers = ["Name", "Status", "Total Units", "Date Added"];
