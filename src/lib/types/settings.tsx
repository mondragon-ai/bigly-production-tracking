import {Staff} from "./shared";

export type StoreDocument = {
  id: string;
  name: string;
  sphat: string;
  domain: string;
  created_at: number;
  updated_at: number;
};

export type SettingsPage = {
  staff: Staff[] | null;
  store: StoreDocument[] | null;
};
