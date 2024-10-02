import {StoreDocument} from "../types/settings";

export const initialStore = (): StoreDocument => {
  return {
    id: "",
    name: "",
    sphat: "",
    created_at: "",
    updated_at: "",
  };
};
