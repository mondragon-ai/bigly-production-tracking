"use client";
import styles from "../../../components/Shared.module.css";
import {FileDetailCard} from "@/components/files/FileDetail";
import PageHeader from "@/components/shared/PageHeader";
import {FileList} from "@/components/shared/FileList";
import useFiles from "@/lib/hooks/useFiles";
import {StartingState} from "@/components/images/StartingState";
import {AddStaff} from "@/components/shared/AddStaff";
import {useState} from "react";

export default function Files() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modal, openModal] = useState<boolean>(false);
  const {
    files,
    loading,
    staff,
    error,
    uploadFiles,
    fetchAndParseFile,
    file_detail,
    deleteFile,
    genreateJobs,
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

  const handleAddStaff = () => {
    openModal(!modal);
    return;
  };

  const handleGenerate = (id: string) => {
    const added_staff = staff.filter((s) => selectedIds.includes(s.id));
    genreateJobs(id, added_staff);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        loading={loading == "posting"}
        title="Pick List Files"
        buttons={[
          {
            text: "ADD STAFF",
            tone: "success",
            onClick: handleAddStaff,
            icon: "add-user",
          },
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
        {modal && (
          <AddStaff
            can_select={true}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            staff={staff}
          />
        )}
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
              handleGenerate={handleGenerate}
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
