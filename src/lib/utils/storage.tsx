import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../configs/firebase";

export const uploadToServer = async (
  file: File | null,
  setFiles: React.Dispatch<React.SetStateAction<any>>,
  files: any,
): Promise<string> => {
  if (!file) {
    alert("Please choose a file first!");
    throw new Error("File not present");
  }
  const name = `${files.domain || "mockups"}_${new Date().getTime()}_${
    file.name
  }`;

  const storageRef = ref(
    storage,
    `/${files.domain || "mockups"}/uploads/${name}`,
  );

  const uploadTask = uploadBytesResumable(storageRef, file);

  const url = await new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setFiles((prev: any) => ({
          ...prev,
          percent: progress,
        }));
      },
      (err) => {
        console.error(err);
        reject(err);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFiles((prev: any) => ({
            ...prev,
            design: downloadURL,
            percent: 0,
          }));
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
