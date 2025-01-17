"use client";
import toast from "react-hot-toast";
import {useState, useEffect, SetStateAction, Dispatch} from "react";
import {LoadingTypes} from "../types/shared";
import {uploadToServer} from "../utils/storage";
import {handleHttpError} from "@/app/shared";
import {biglyRequest} from "../networking/biglyServer";
import {FetchAndParsedCleanCSV, FileDocument} from "../types/files";
import {toUrlHandle} from "../utils/converter.tsx/text";
import {useGlobalContext} from "../store/context";
import {useRouter} from "next/navigation";

interface UseFilesUploadReturn {
  files: FileDocument[];
  loading: LoadingTypes;
  error: string | null;
  uploadFiles: (file: File) => Promise<void>;
  fetchAndParseFile: (id: string) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  file_detail: FetchAndParsedCleanCSV | null;
  genreateJobs: (id: string) => Promise<void>;
  setError: Dispatch<SetStateAction<string | null>>;
}

const useFiles = (): UseFilesUploadReturn => {
  const router = useRouter();
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

      if (status == 401) {
        return router.push("/");
      }
      if (status == 403) {
        return router.push("/jobs");
      }

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

      if (status == 401) {
        return router.push("/");
      }
      if (status == 403) {
        return router.push("/jobs");
      }

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

      if (status == 401) {
        return router.push("/");
      }
      if (status == 403) {
        return router.push("/jobs");
      }

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

      if (status == 401) {
        return router.push("/");
      }
      if (status == 403) {
        return router.push("/jobs");
      }

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

      if (status == 401) {
        return router.push("/");
      }
      if (status == 403) {
        return router.push("/jobs");
      }

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
    file_detail,
    error,
    setError,
    uploadFiles,
    fetchAndParseFile,
    genreateJobs,
    deleteFile,
  };
};

export default useFiles;
