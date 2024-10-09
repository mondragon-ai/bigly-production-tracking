"use client";
import {useState, useEffect} from "react";
import {uploadToServer} from "../utils/storage";
import {image_list} from "../data/images";
import {ImageDocument} from "../types/images";
import {LoadingTypes} from "../types/shared";
import {delay, handleHttpError} from "../utils/shared";
import {biglyRequest} from "../networking/biglyServer";
import toast from "react-hot-toast";

interface UseImageUploadReturn {
  images: ImageDocument[];
  loading: LoadingTypes;
  error: string | null;
  uploadImage: (file: File) => Promise<void>;
  img_detail: ImageDocument | null;
  setImageCard: (id: string) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
}

const useImageUpload = (): UseImageUploadReturn => {
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
    console.log("uploading");
    try {
      const downloadURL = await uploadToServer(file, "images");
      console.log(downloadURL);
      //   const response = await fetch("/api/images", {
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
    try {
      //   const response = await fetch("/api/images", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({name: file.name, link: downloadURL}),
      //   });
      //   if (!response.ok) throw new Error("Failed to save image URL");
      const new_list = images.filter((i) => i.id !== id);
      setImages(new_list);
      setImgDetail(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(null);
    }
  };

  return {
    images,
    loading,
    error,
    uploadImage,
    setImageCard,
    img_detail,
    deleteImage,
  };
};

export default useImageUpload;
