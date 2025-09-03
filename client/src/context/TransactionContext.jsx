import { createContext } from "react";
import { addTransactionApi } from "../services/Transaction/AddTransactionService";
import { getSummeryApi } from "../services/Transaction/getSummeryService";

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

  async function getSummery() {
           try {
            const response= await getSummeryApi()
             if(response){
              return response
             }else{
              alert("Failed to fetch summary in context")
             }
            
           } catch (error) {
            throw error
            
           }
    
  }



  let TransactionValue = {addTransaction,getSummery};

  return (
    <TransactionContext.Provider value={TransactionValue}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
