import {Stages} from "./jobs";

export type IconTypes =
  | "rejected"
  | "trash"
  | "explode"
  | "delivery"
  | "store"
  | "link"
  | "info"
  | "fire"
  | "floppy"
  | "upload"
  | "clock"
  | "eye-slash"
  | "eye"
  | "wand"
  | "calendar"
  | "close"
  | "search"
  | "badge-check"
  | "shopping-bag"
  | "qr-code"
  | "mixed-chart"
  | "add-user"
  | "chart-line-up"
  | "angle-up"
  | "angle-down"
  | "arrow-right"
  | "table-row"
  | "chart-up"
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
  created_at?: number;
  updated_at?: number;
};

export type BadgeType = {
  icon: IconTypes;
  text: string;
  tone: "critical" | "success" | "info" | "magic";
};

export type ServerResponse = {message: string; data: any};

export type BiglyServerResponse = {
  status: number;
  data: any | null;
  message: string;
};
