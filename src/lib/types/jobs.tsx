import {Staff} from "./shared";

export type JobDocument = {
  id: string;
  job_name: string;
  is_priority: boolean;
  is_approved: boolean;
  stage: Stages;
  staff: Staff[];
  time_started: StateTimes;
  time_ended: StateTimes;
  error_rate: ErrorRate;
  items: Items[];
  created_at: number;
  updated_at: number;
  qr_code: string;
};

export type ErrorRate = {[key in Stages]: number};

export type Images = {
  front: string;
  back: string;
  sleeve: string;
  front_mockup: string;
  back_mockup: string;
};

export type ImageFiles = {
  front: File | null;
  back: File | null;
  sleeve: File | null;
  front_mockup: File | null;
  back_mockup: File | null;
};

export type Items = {
  has_error: boolean;
  staff_error: string;
  staff: string;
  id: string;
  images: Images;
  sku: string;
  size: string;
  color: string;
  type: "shirt" | "hoodie";
  store: string;
  status: "pending" | "completed" | "rejected";
};

export type StateTimes = {
  pending: number;
  printing: number;
  cutting: number;
  staging: number;
  pressing: number;
  double: number;
  folding: number;
};

export type Stages =
  | "pending"
  | "printing"
  | "cutting"
  | "staging"
  | "pressing"
  | "double"
  | "folding"
  | "completed";
