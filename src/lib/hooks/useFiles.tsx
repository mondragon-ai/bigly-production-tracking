"use client";
import toast from "react-hot-toast";
import {useState, useEffect} from "react";
import {LoadingTypes} from "../types/shared";
import {uploadToServer} from "../utils/storage";
import {handleHttpError} from "../utils/shared";
import {biglyRequest} from "../networking/biglyServer";
import {FetchAndParsedCleanCSV, FileDocument} from "../types/files";
import {toUrlHandle} from "../utils/converter.tsx/text";
import {useGlobalContext} from "../store/context";

interface UseFilesUploadReturn {
  files: FileDocument[];
  loading: LoadingTypes;
  error: string | null;
  uploadFiles: (file: File) => Promise<void>;
  fetchAndParseFile: (id: string) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  file_detail: FetchAndParsedCleanCSV | null;
  genreateJobs: (id: string) => Promise<void>;
}

const useFiles = (): UseFilesUploadReturn => {
  const {globalState} = useGlobalContext();
  const [files, setFiles] = useState<FileDocument[]>([]);
  const [file_detail, setFileDetail] = useState<FetchAndParsedCleanCSV | null>(
    null,
  );
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        "/app/files",
        "GET",
        null,
      );

      if (status < 300 && data) {
        toast.success("Fetched files");
        setFiles(data.files);
        return;
      } else {
        handleHttpError(status, `${message}`, setError);
      }
      return;
    } catch (err) {
      handleHttpError(500, "Server Error", setError);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [globalState.user.jwt]);

  const uploadFiles = async (file: File) => {
    setLoading("posting");
    setError(null);

    try {
      const csv_url = await uploadToServer(file, "files");

      const {status, data, message} = await biglyRequest(
        "/app/files/",
        "POST",
        {
          file: {
            csv_url: csv_url,
            name: `${toUrlHandle(file.name, "files")}.csv`,
          },
        },
      );

      if (status < 300 && data) {
        toast.success("Uploaded File");
        console.log(data);
        setFiles((p) => [...p, data.file]);
        return;
      } else {
        handleHttpError(status, `${message}`, setError);
      }
      return;
    } catch (err) {
      handleHttpError(500, "Server Error", setError);
    } finally {
      setLoading(null);
    }
  };

  const fetchAndParseFile = async (id: string) => {
    setLoading("requesting");
    setError(null);

    try {
      const {status, data, message} = await biglyRequest(
        `/app/files/${id}`,
        "GET",
        null,
      );

      if (status < 300 && data) {
        toast.success("Fetched files");
        setFileDetail(data.file);
        return;
      } else {
        handleHttpError(status, `${message}`, setError);
      }
      return;
    } catch (err) {
      handleHttpError(500, "Server Error", setError);
    } finally {
      setLoading(null);
    }
  };

  const deleteFile = async (id: string) => {
    setLoading("deleting");
    setError(null);

    try {
      const {status, data, message} = await biglyRequest(
        `/app/files/${id}`,
        "DELETE",
        null,
      );

      if (status < 300) {
        toast.success("Deleted files");
        const new_list = files.filter((f) => f.id !== id);
        setFiles(new_list);
        setFileDetail(null);
        return;
      } else {
        handleHttpError(status, `${message}`, setError);
      }
      return;
    } catch (err) {
      handleHttpError(500, "Server Error", setError);
    } finally {
      setLoading(null);
    }
  };

  const genreateJobs = async (id: string) => {
    setLoading("requesting");
    setError(null);

    try {
      const {status, data, message} = await biglyRequest(
        `/app/files/${id}/generate`,
        "POST",
        null,
      );

      if (status < 300 && file_detail) {
        toast.success("Generated Jobs");
        console.log(data);
        file_detail.status = "generated";
        const updated_list = files.map((f) => {
          if (f.id == id) {
            return {...f, status: "generated"} as FileDocument;
          } else {
            return f;
          }
        });
        setFiles(updated_list);
        setFileDetail(file_detail);
        return;
      } else {
        handleHttpError(status, `${message}`, setError);
      }
      return;
    } catch (err) {
      handleHttpError(500, "Server Error", setError);
    } finally {
      setLoading(null);
    }
  };

  return {
    files,
    loading,
    error,
    uploadFiles,
    fetchAndParseFile,
    genreateJobs,
    file_detail,
    deleteFile,
  };
};

export default useFiles;
