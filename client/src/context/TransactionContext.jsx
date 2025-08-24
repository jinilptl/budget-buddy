import { createContext } from "react";

export const TransactionContext = createContext();

const TransactionContextProvider = ({ children }) => {
  let TransactionValue = {};

  return (
    <TransactionContext.Provider value={TransactionValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
  