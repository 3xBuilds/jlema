"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  const [showNftInfo, setShowNftInfo] = useState(null);
  const [openSettings, setOpenSettings] = useState(false);
  const[selected, setSelected] = useState(0);
  const [balances, setBalances] = useState([]);

  const [openModal, setOpenModal] = useState(false);


  return (
    <GlobalContext.Provider value={{ loader, setLoader, balances, setBalances, user, setUser, selected, setSelected, showNftInfo, setShowNftInfo, openSettings, setOpenSettings, openModal, setOpenModal}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
