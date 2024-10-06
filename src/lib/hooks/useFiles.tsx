"use client";
import {useState, useEffect} from "react";
import {uploadToServer} from "../utils/storage";
import {FileDetail, FileDocument} from "../types/files";
import {files_list, file_details} from "@/lib/data/files";
import {LoadingTypes, Staff} from "../types/shared";
import {staff_list} from "../data/settings";
import {delay} from "../utils/shared";

interface UseFilesUploadReturn {
  files: FileDocument[];
  loading: LoadingTypes;
  staff: Staff[];
  error: string | null;
  uploadFiles: (file: File) => Promise<void>;
  fetchAndParseFile: (id: string) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  file_detail: FileDetail | null;
  genreateJobs: (id: string, staff: Staff[]) => Promise<void>;
}

const useFiles = (): UseFilesUploadReturn => {
  const [files, setFiles] = useState<FileDocument[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [file_detail, setFileDetail] = useState<FileDetail | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading("loading");
    try {
      await delay(1500);
      //   const response = await fetch("/api/files");
      //   if (!response.ok) throw new Error("Failed to fetch files");
      //   const data: Image[] = await response.json();
      setFiles(files_list);
      setStaff(staff_list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFiles = async (file: File) => {
    setLoading("posting");
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
      setLoading(null);
    }
  };

  const fetchAndParseFile = async (id: string) => {
    setLoading("requesting");
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

      if (file_detail) {
        setFileDetail(file_detail);
      } else {
        setFileDetail(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  const deleteFile = async (id: string) => {
    setLoading("deleting");
    try {
      //   const response = await fetch("/api/images", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({name: file.name, link: downloadURL}),
      //   });
      //   if (!response.ok) throw new Error("Failed to save image URL");
      const new_list = files.filter((f) => f.id !== id);
      setFiles(new_list);
      setFileDetail(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  const genreateJobs = async (id: string, staff: Staff[]) => {
    setLoading("posting");
    try {
      console.log({file: id, staff});
    } catch (error) {
      console.error("ERROR: Generating Jobs: ", error);
    } finally {
      setLoading(null);
    }
  };

  return {
    files,
    loading,
    staff,
    error,
    uploadFiles,
    fetchAndParseFile,
    genreateJobs,
    file_detail,
    deleteFile,
  };
};

export default useFiles;
