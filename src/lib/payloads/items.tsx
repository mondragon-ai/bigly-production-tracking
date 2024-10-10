import {uploadAndSaveImage} from "../networking/bigly/images";
import {ImageFiles, Images, Items} from "../types/jobs";

export const createItemPayload = async (item: Items, images: ImageFiles) => {
  const imgs = {} as Images;
  for (let [key, value] of Object.entries(images)) {
    if (!value) {
      imgs[key as keyof Images] = "";
      continue;
    }

    const {url} = await uploadAndSaveImage(value);
    imgs[key as keyof Images] = url;
  }
  return {
    has_error: false,
    staff_error: "",
    staff: "",
    id: item.sku || "",
    images: imgs,
    sku: item.sku || "",
    size: item.size || "OSFA",
    color: item.color || "black",
    type: item.type || "shirt",
    store: item.store || "bigly",
    status: item.status || "pending",
    created_at: 0,
    updated_at: 0,
  };
};
