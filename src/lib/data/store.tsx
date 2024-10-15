import {AppContextType, UserType} from "../types/store";

export const initialUser: UserType = {
  id: "",
  role: null,
  position: null,
  name: "",
  email: "",
  jwt: null,
};

export const initGlobalValues: AppContextType = {
  user: initialUser,
  sidebar: false,
};
