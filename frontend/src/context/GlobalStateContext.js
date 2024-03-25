import  { createContext, useContext } from "react";

export const GlobalStateContext = createContext('globalStateContext');
export const useGlobalState = () => useContext(GlobalStateContext);
