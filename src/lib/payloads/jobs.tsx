import {ImageFiles, Images, Items, JobDocument} from "../types/jobs";
import {ProductsResponse} from "../types/shopify";

export const initialJobs = (): JobDocument => {
  return {
    qr_code: "",
    id: "",
    job_name: "",
    is_priority: false,
    is_approved: false,
    stage: "pending",
    staff: [],
    time_started: {
      pending: 0,
      printing: 0,
      cutting: 0,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 0,
    },
    time_ended: {
      pending: 0,
      printing: 0,
      cutting: 0,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 0,
    },
    error_rate: {
      pending: 0,
      printing: 0,
      cutting: 0,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 0,
      completed: 0,
    },
    items: [],
    created_at: 0,
    updated_at: 0,
  };
};

export const initialItem = (): Items => {
  return {
    has_error: false,
    staff_error: "",
    staff: "",
    id: "",
    images: {
      front: "",
      back: "",
      sleeve: "",
      front_mockup: "",
      back_mockup: "",
    },
    sku: "",
    size: "",
    color: "",
    type: "shirt",
    store: "bigly",
    status: "pending",
  };
};

export const initalImages = (): Images => {
  return {
    front: "",
    back: "",
    sleeve: "",
    front_mockup: "",
    back_mockup: "",
  };
};

export const initalImageFiles = (): ImageFiles => {
  return {
    front: null,
    back: null,
    sleeve: null,
    front_mockup: null,
    back_mockup: null,
  };
};

export const convertShopifyToItem = (response: ProductsResponse) => {
  if (!response || !response.data || !response.data.products.edges[0]) {
    return null;
  }

  const items = [];

  for (let v of response.data.products.edges[0].node.variants.edges) {
    const parse = parseSKU(v.node.sku);
    if (!parse) continue;
    const [baseSKU, sizeCategory, sku_type, sku, size, color] = parse;

    items.push({
      has_error: false,
      staff_error: "",
      staff: "",
      id: v.node.id,
      images: {
        front: "",
        back: "",
        sleeve: "",
        front_mockup: v.node.image.url,
        back_mockup: "",
      },
      sku: v.node.sku,
      size: size,
      color: color,
      type: sku_type == "TS" ? "shirt" : sku_type == "HD" ? "hoodie" : "hat",
      store: v.node.sku.split("-")[0] || "bigly",
      status: "pending",
    } as Items);
  }

  return items;
};

// SKU Parsing Logic
const parseSKU = (
  sku: string,
): [string, string, string, string, string, string] | null => {
  if (!sku) return null;
  const parts = sku.split("-");
  if (parts.length < 4) return null;

  const sku_type = parts[1];
  if (!["HD", "TS"].includes(sku_type)) return null;

  let design = parts[2];
  const size = parts[parts.length - 1];
  if (parts.length > 5) {
    design += "-" + parts[3];
  }

  const color = parts[parts.length - 2];

  const sizeCategory = categorizeSize(size);
  const baseSKU = `${sku_type}-${design}`;
  return [baseSKU, sizeCategory, sku_type, sku, size, color];
};

const categorizeSize = (size: string) => {
  if (["S", "M", "L", "XL", "2XL", "3XL"].includes(size)) return "S-3XL";
  if (["4XL", "5XL"].includes(size)) return "4XL-5XL";
  return "Other";
};
