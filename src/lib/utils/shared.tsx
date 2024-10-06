import {IconTypes} from "../types/shared";

export const copyToClipBoard = (value: string) => {
  if (navigator) {
    navigator.clipboard.writeText(value);
  }
};

export const badgeIcon = (
  status:
    | "rejected"
    | "pending"
    | "completed"
    | "in_stock"
    | "out_of_stock"
    | "archived",
): IconTypes => {
  switch (status) {
    case "rejected":
      return "rejected";

    case "pending":
      return "delivery";

    case "completed":
      return "badge-check";

    case "in_stock":
      return "badge-check";

    case "out_of_stock":
      return "fire";

    case "archived":
      return "trash";

    default:
      return "wand";
  }
};

export const badgeColor = (
  status:
    | "rejected"
    | "pending"
    | "completed"
    | "in_stock"
    | "out_of_stock"
    | "archived",
): "success" | "critical" | "info" | "magic" => {
  switch (status) {
    case "rejected":
      return "critical";

    case "pending":
      return "magic";

    case "completed":
      return "success";

    case "in_stock":
      return "success";

    case "out_of_stock":
      return "critical";

    case "archived":
      return "info";

    default:
      return "magic";
  }
};

export const delay = (s: number) => {
  return new Promise((resolve) => setTimeout(resolve, s));
};
