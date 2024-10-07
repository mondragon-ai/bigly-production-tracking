import {StoreDocument} from "../types/settings";

export const initialStore = (): StoreDocument => {
  return {
    id: "",
    name: "",
    sphat: "",
    domain: "",
    created_at: 0,
    updated_at: 0,
  };
};
