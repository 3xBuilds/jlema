"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

  const router = useRouter();

  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});

  return (
    <GlobalContext.Provider value={{ loader, setLoader, user, setUser}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
