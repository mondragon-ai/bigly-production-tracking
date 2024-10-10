import {toUrlHandle} from "@/lib/utils/converter.tsx/text";
import {uploadToServer} from "@/lib/utils/storage";
import {biglyRequest} from "../biglyServer";

export const uploadAndSaveImage = async (file: File) => {
  if (!file) return {status: 400, message: "doesnt exist", url: ""};

  const name = `${toUrlHandle(file.name, "images")}.${file.type.split("/")[1]}`;

  const url = await uploadToServer(file, "images");
  const {status, message} = await biglyRequest("/app/images", "POST", {
    image: {
      url: url,
      name: name,
    },
  });

  return {status, message, url};
};
