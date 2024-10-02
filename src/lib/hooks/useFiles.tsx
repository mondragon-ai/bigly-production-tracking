"use client";
import {useState, useEffect} from "react";
import {uploadToServer} from "../utils/storage";
import {FileDetail, FileDocument} from "../types/files";
import {files_list, file_details} from "@/lib/data/files";

interface UseFilesUploadReturn {
  files: FileDocument[];
  loading: boolean;
  error: string | null;
  uploadFiles: (file: File) => Promise<void>;
  fetchAndParseFile: (id: string) => Promise<void>;
  file_detail: FileDetail | null;
}

const useFiles = (): UseFilesUploadReturn => {
  const [files, setFiles] = useState<FileDocument[]>(files_list);
  const [file_detail, setFileDetail] = useState<FileDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      //   const response = await fetch("/api/files");
      //   if (!response.ok) throw new Error("Failed to fetch files");
      //   const data: Image[] = await response.json();
      //   setFiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFiles = async (file: File) => {
    setLoading(true);
    console.log("uploading");
    try {
      const downloadURL = await uploadToServer(file, "files");
      console.log(downloadURL);
      //   const response = await fetch("/api/files", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({name: file.name, link: downloadURL}),
      //   });
      //   if (!response.ok) throw new Error("Failed to save image URL");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  const fetchAndParseFile = async (id: string) => {
    setLoading(true);
    console.log("fetching");
    try {
      // const response = await fetch(
      //   "https://firebasestorage.googleapis.com/v0/b/bigly-server.appspot.com/o/images%2Fuploads%2F1727879269134_Aundrel%20PAST%20Winner%20Banner%20Email.png?alt=media&token=68373442-084a-4418-95d8-9e9096cac4ca",
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   },
      // );
      // if (!response.ok) throw new Error("Failed to save image URL");
      const file_detail = file_details.find((f) => f.id == id);
      console.log(file_detail);

      if (file_detail) {
        setFileDetail(file_detail);
      } else {
        setFileDetail(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return {
    files,
    loading,
    error,
    uploadFiles,
    fetchAndParseFile,
    file_detail,
  };
};

export default useFiles;