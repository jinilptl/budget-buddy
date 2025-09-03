import { createContext, useEffect, useState } from "react";
import { addTransactionApi } from "../services/Transaction/AddTransactionService";
import { getSummeryApi } from "../services/Transaction/getSummeryService";
import { getAllTransactionsApi } from "../services/Transaction/getAllTransactionsService";

export const TransactionContext = createContext();

const TransactionContextProvider = ({ children }) => {
  const [Transactions, setTransactions] = useState([]);

  async function getAllTransactions() {
    try {
      const response = await getAllTransactionsApi();
      if (response) {
        return response;
      } else {
        alert("Failed to fetch all transactions in context");
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    async function fetchTransactions() {
      const response = await getAllTransactions();
      if (response.status === 201) {
        let data = response.data.data;
        console.log(data);

        setTransactions(data.allTransactions);
      }
    }

    fetchTransactions();
  }, []);

  async function addTransaction(formData) {
    try {
      const response = await addTransactionApi(formData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function getSummery() {
    try {
      const response = await getSummeryApi();
      if (response) {
        return response;
      } else {
        alert("Failed to fetch summary in context");
      }
    } catch (error) {
      throw error;
    }
  }

  let TransactionValue = { addTransaction, getSummery, Transactions ,setTransactions};

  return (
    <TransactionContext.Provider value={TransactionValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
