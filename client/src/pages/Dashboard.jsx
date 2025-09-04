import { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { SummaryCard } from "../components/SummaryCard.jsx";
import { TransactionList } from "../components/TransactionList.jsx";
import { Link } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext.jsx";

export function Dashboard() {


  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);


  const { Transactions, deleteTransaction, setTransactions, getSummery } = useContext(TransactionContext);

  useEffect(() => {
    async function fetchSummary() {
      const response = await getSummery();
      if (response.status === 201) {
        console.log(response.data.data);
        let data = response.data.data;
        setBalance(data.balance);
        setTotalIncome(data.totalIncome);
        setTotalExpense(data.totalExpense);
      }
    }
    fetchSummary();
  }, [deleteTransactionApiCall]);

 async function deleteTransactionApiCall(id) {
    if (!id) return;

    if (confirm("Are you sure you want to delete this transaction?")) {
      console.log("Transaction deleted:", id);

        const response = await deleteTransaction(id);
        console.log("response after deleting transaction ", response);

        if (response.status === 200) {
          setTransactions((prev) => {
            return prev.filter((transaction) => transaction._id !== id);
          });
        }
    } else {
      return;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your income and expenses</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard
            title="Total Income"
            amount={totalIncome}
            type="income"
          />
          <SummaryCard
            title="Total Expenses"
            amount={totalExpense}
            type="expense"
          />
          <SummaryCard title="Balance" amount={balance} type="balance" />
        </div>

        {/* Add Transaction Button */}
        <div className="mb-6">
          <Link
            to={"/home/add-transaction"}
            className="bg-teal-500  text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors inline-flex items-center gap-2 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Transaction
          </Link>
        </div>

        {/* Transaction List */}
        <TransactionList deleteTransactionApiCall={deleteTransactionApiCall} />
      </div>
    </div>
  );
}
