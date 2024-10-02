"use client";
import {useState, useEffect} from "react";
import {uploadToServer} from "../utils/storage";

interface Image {
  id: string;
  name: string;
  link: string;
}

interface UseFilesUploadReturn {
  files: Image[];
  loading: boolean;
  error: string | null;
  uploadFiles: (file: File) => Promise<void>;
  fetchAndParseFile: (id: string) => Promise<void>;
}

const useFiles = (): UseFilesUploadReturn => {
  const [files, setFiles] = useState<Image[]>([]);
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
      const response = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/bigly-server.appspot.com/o/files%2Fuploads%2F1727878314346_pick.csv?alt=media&token=4c8d1bee-e157-429c-a563-21c50460a88a",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error("Failed to save image URL");
      console.log(response);
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
  };
};

export default useFiles;
