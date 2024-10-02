import {Staff} from "./shared";

export type StoreDocument = {
  id: string;
  name: string;
  sphat: string;
  created_at: string;
  updated_at: string;
};

export type SettingsPage = {
  staff: Staff[];
  store: StoreDocument[];
};
