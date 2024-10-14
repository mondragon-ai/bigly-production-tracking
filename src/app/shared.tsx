"use client";
import toast from "react-hot-toast";
import {IconTypes} from "../lib/types/shared";
import {Dispatch, SetStateAction} from "react";
import {Stages} from "../lib/types/jobs";
import {useRouter} from "next/navigation";

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

export const handleHttpError = (
  status: number,
  message: string,
  setError: Dispatch<SetStateAction<string | null>>,
): void => {
  console.log({status});
  const router = useRouter();
  switch (status) {
    case 400:
      toast.error(message);
      setError(message);
      return;
    case 401:
      toast.error(message);
      setError(message);
      router.push("/");
      return;
    case 403:
      toast.error(message);
      setError(message);
      router.push("/jobs");
      return;
    case 409:
      toast.error(message);
      setError(message);
      return;
    case 500:
      toast.error(message);
      setError(message);
      return;
    default:
      toast.error(message);
      setError(message);
      return;
  }
};

export const findNextStage = (stage: Stages): Stages => {
  switch (stage) {
    case "pending":
      return "printing";

    case "printing":
      return "cutting";

    case "cutting":
      return "staging";

    case "staging":
      return "pressing";

    case "pressing":
      return "double";

    case "double":
      return "folding";

    case "folding":
      return "completed";

    case "completed":
      return "completed";

    default:
      return "pending";
  }
};
