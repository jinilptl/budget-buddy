import { createContext } from "react";
import { addTransactionApi } from "../services/Transaction/AddTransactionService";

export const TransactionContext = createContext();

const TransactionContextProvider = ({ children }) => {


  
  async function addTransaction(formData) {
    try {
      const response = await addTransactionApi(formData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  let TransactionValue = {addTransaction};

  return (
    <TransactionContext.Provider value={TransactionValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
