import {SettingsPage, StoreDocument} from "../types/settings";
import {Staff} from "../types/shared";

export const staff_list: Staff[] = [
  {
    id: "staff_004",
    name: "Bob Williams",
    email: "bobwilliams@example.com",
    role: "staff",
    position: "cutting",
    created_at: 0,
    updated_at: 0,
  },
  {
    id: "staff_001",
    name: "John Doe",
    email: "johndoe@example.com",
    role: "staff",
    position: "cutting",
    created_at: 0,
    updated_at: 0,
  },
];

export const store_list: StoreDocument[] = [
  {
    id: "1",
    name: "Alex Jones",
    sphat: "shpat_12345",
    created_at: 0,
    updated_at: 0,
    domain: "",
  },
  {
    id: "2",
    name: "Hodge Twins",
    sphat: "shpat_12345",
    created_at: 0,
    updated_at: 0,
    domain: "",
  },
];

export const settings_data: SettingsPage = {
  staff: staff_list,
  store: store_list,
};
