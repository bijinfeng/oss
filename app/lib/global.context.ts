import { createContext, useContext } from "react";
import type { UserInfo } from "~/interface";

export interface GlobalContextState {
  userInfo: UserInfo
}

export const GlobalContext = createContext({} as GlobalContextState);

export const useGlobalContext = () => useContext(GlobalContext);
