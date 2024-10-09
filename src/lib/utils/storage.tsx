import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../configs/firebase";
import {toUrlHandle} from "./converter.tsx/text";

export const uploadToServer = async (
  file: File | null,
  type: "images" | "files",
): Promise<string> => {
  if (!file) {
    alert("Please choose a file first!");
    throw new Error("File not present");
  }
  const name = `${new Date().getTime()}_${toUrlHandle(file.name, type)}`;

  const storageRef = ref(storage, `/${type}/uploads/${name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  const url = await new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
      },
      (err) => {
        console.error(err);
        reject(err);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      },
    );
  });

  return url;
};
