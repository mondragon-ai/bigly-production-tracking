"use client";
import toast from "react-hot-toast";
import {useState, useEffect, Dispatch, SetStateAction} from "react";
import {LoadingTypes} from "../types/shared";
import {ImageDocument} from "../types/images";
import {handleHttpError} from "@/app/shared";
import {biglyRequest} from "../networking/biglyServer";
import {toUrlHandle} from "../utils/converter.tsx/text";
import {createCurrentSeconds} from "../utils/converter.tsx/time";
import {uploadAndSaveImage} from "../networking/bigly/images";
import {useRouter} from "next/navigation";

interface UseImageUploadReturn {
  images: ImageDocument[];
  loading: LoadingTypes;
  error: string | null;
  img_detail: ImageDocument | null;
  uploadImage: (file: File) => Promise<void>;
  setImageCard: (id: string) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  setError: Dispatch<SetStateAction<string | null>>;
}

const useImageUpload = (): UseImageUploadReturn => {
  const router = useRouter();
  const [images, setImages] = useState<ImageDocument[]>([]);
  const [img_detail, setImgDetail] = useState<ImageDocument | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>("loading");
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading("loading");
    setError(null);
    try {
      const {status, data, message} = await biglyRequest(
        "/app/images",
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
        toast.success("Fetched Data");
        setImages(data.images);
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
    fetchImages();
  }, []);

  const uploadImage = async (file: File) => {
    setLoading("posting");
    setError(null);
    console.log("[uploading]");
    try {
      const name = `${toUrlHandle(file.name, "images")}.${
        file.type.split("/")[1]
      }`;
      const seconds = createCurrentSeconds();
      const {status, message, url} = await uploadAndSaveImage(file);

      const image = {
        id: name,
        name: name,
        added: seconds,
        created_at: seconds,
        url: url,
      } as ImageDocument;

      if (status == 401) {
        return router.push("/");
      }
      if (status == 403) {
        return router.push("/jobs");
      }

      if (status < 300) {
        toast.success("Image Added");
        setImages((p) => p && [...p, image]);
        setImgDetail(image);
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

  const setImageCard = async (id: string) => {
    setLoading("requesting");
    try {
      const img = images.find((f) => f.id == id);

      if (img) {
        setImgDetail(img);
      } else {
        setImgDetail(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  const deleteImage = async (id: string) => {
    setLoading("deleting");
    setError(null);

    try {
      const {status, message} = await biglyRequest(
        `/app/images/${id}`,
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
        toast.success("Deleted Image");
        const new_list = images.filter((i) => i.id !== id);
        setImages(new_list);
        setImgDetail(null);
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
    images,
    loading,
    error,
    img_detail,
    uploadImage,
    setImageCard,
    setError,
    deleteImage,
  };
};

export default useImageUpload;
