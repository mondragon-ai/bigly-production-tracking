import {Stages} from "./jobs";

export type IconTypes =
  | "rejected"
  | "trash"
  | "explode"
  | "delivery"
  | "store"
  | "link"
  | "fire"
  | "floppy"
  | "upload"
  | "clock"
  | "wand"
  | "badge-check"
  | "hour_glass";

export type LoadingTypes =
  | "loading"
  | "posting"
  | "requesting"
  | "deleting"
  | null;

export type Staff = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
  position: Stages;
};

export type BadgeType = {
  icon: IconTypes;
  text: string;
  tone: "critical" | "success" | "info" | "magic";
};
