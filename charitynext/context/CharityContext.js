import React, { createContext } from "react";
import { useQuery } from "@apollo/client";
import { useMoralis } from "react-moralis";
import GETGRAPHQUERY from "../constants/getGraphQuery";

export const CharityContext = createContext();

export const CharityProvider = ({ children }) => {
  const { address, isWeb3enabled } = useMoralis();

  const { loading, error, data: allCharities } = useQuery(GETGRAPHQUERY);

  //code
  return (
    <CharityContext.Provider value={{ allCharities }}>
      {children}
    </CharityContext.Provider>
  );
};
