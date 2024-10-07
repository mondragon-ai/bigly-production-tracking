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
  created_at: string;
  updated_at: string;
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
  pending: string;
  printing: string;
  cutting: string;
  staging: string;
  pressing: string;
  double: string;
  folding: string;
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
