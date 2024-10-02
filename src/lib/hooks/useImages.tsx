"use client";
import {useState, useEffect} from "react";
import {uploadToServer} from "../utils/storage";
import {image_list} from "../data/images";
import {ImageDocument} from "../types/images";

interface UseImageUploadReturn {
  images: ImageDocument[];
  loading: boolean;
  error: string | null;
  uploadImage: (file: File) => Promise<void>;
  img_detail: ImageDocument | null;
  setImageCard: (id: string) => Promise<void>;
}

const useImageUpload = (): UseImageUploadReturn => {
  const [images, setImages] = useState<ImageDocument[]>(image_list);
  const [img_detail, setImgDetail] = useState<ImageDocument | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      //   const response = await fetch("/api/images");
      //   if (!response.ok) throw new Error("Failed to fetch images");
      //   const data: Image[] = await response.json();
      //   setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async (file: File) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const setImageCard = async (id: string) => {
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
      const img = images.find((f) => f.id == id);
      console.log(img);

      if (img) {
        setImgDetail(img);
      } else {
        setImgDetail(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
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
