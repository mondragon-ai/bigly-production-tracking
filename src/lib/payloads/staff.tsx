import {Staff} from "../types/shared";

export const initialStaff = (): Staff => {
  return {
    id: "",
    name: "",
    email: "",
    role: "staff",
    position: "double",
    created_at: "",
  };
};
