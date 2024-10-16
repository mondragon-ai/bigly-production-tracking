export type ContextType = {
  globalState: AppContextType;
  setGlobalState: (type: GlobalStateType, data: UserType | boolean) => void;
};

export type AppContextType = {
  user: UserType;
  sidebar: boolean;
};

export type UserType = {
  id: string;
  role: null | "admin" | "staff" | "lead";
  position:
    | null
    | "printing"
    | "cutting"
    | "pressing"
    | "double"
    | "folding"
    | "packing";
  name: string;
  email: string;
  jwt: null | string;
  password: string;
};

export type GlobalStateType = "user" | "sidebar";
