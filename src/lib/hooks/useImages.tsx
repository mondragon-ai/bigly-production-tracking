"use client";
import {useState, useEffect} from "react";
import {uploadToServer} from "../utils/storage";

interface Image {
  id: string;
  name: string;
  link: string;
}

interface UseImageUploadReturn {
  images: Image[];
  loading: boolean;
  error: string | null;
  uploadImage: (file: File) => Promise<void>;
}

const useImageUpload = (): UseImageUploadReturn => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
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

  return {
    images,
    loading,
    error,
    uploadImage,
  };
};

export default useImageUpload;
