"use client";
import {useState, useEffect} from "react";
import {uploadToServer} from "../utils/storage";
import {image_list} from "../data/images";
import {ImageDocument} from "../types/images";
import {LoadingTypes} from "../types/shared";

interface UseImageUploadReturn {
  images: ImageDocument[];
  loading: LoadingTypes;
  error: string | null;
  uploadImage: (file: File) => Promise<void>;
  img_detail: ImageDocument | null;
  setImageCard: (id: string) => Promise<void>;
}

const useImageUpload = (): UseImageUploadReturn => {
  const [images, setImages] = useState<ImageDocument[]>(image_list);
  const [img_detail, setImgDetail] = useState<ImageDocument | null>(null);
  const [loading, setLoading] = useState<LoadingTypes>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading("loading");
    try {
      //   const response = await fetch("/api/images");
      //   if (!response.ok) throw new Error("Failed to fetch images");
      //   const data: Image[] = await response.json();
      //   setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
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

  return {
    images,
    loading,
    error,
    uploadImage,
    setImageCard,
    img_detail,
  };
};

export default useImageUpload;
