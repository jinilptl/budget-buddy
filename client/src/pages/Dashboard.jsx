import { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { SummaryCard } from "../components/SummaryCard.jsx";
import { TransactionList } from "../components/TransactionList.jsx";
import { Link } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext.jsx";
import axios from "axios";

export function Dashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [latestTransactions, setLatestTransactions] = useState([]);

  const { deleteTransaction, setTransactions, getSummery,Transactions } =
    useContext(TransactionContext);

  // ✅ Fetch latest 24h transactions
  async function fetchLatestTransactions() {
    const backendUrl = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${backendUrl}/transaction/latest`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.status === 201) {
        setLatestTransactions(res.data.data.data);
      }
    } catch (error) {
      console.error("Error fetching latest transactions", error);
    }
  }

  // ✅ Fetch summary
  async function fetchSummary() {
    try {
      const res = await getSummery();
      if (res.status === 201) {
        const data = res.data.data;
        setBalance(data.balance);
        setTotalIncome(data.totalIncome);
        setTotalExpense(data.totalExpense);
      }
    } catch (error) {
      console.error("Error fetching summary", error);
    }
  }

  // ✅ Delete Transaction
  async function handleDeleteTransaction(id) {
    if (!id) return;

    const confirmDelete = confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteTransaction(id);
      if (res.status === 200) {
        setTransactions((prev) => prev.filter((tx) => tx._id !== id));
        fetchLatestTransactions(); // refresh
      }
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  }

  useEffect(() => {
    fetchSummary();
    fetchLatestTransactions();
  }, [Transactions]);

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
            to="/home/add-transaction"
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors inline-flex items-center gap-2 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add Transaction
          </Link>
        </div>

        {/* ✅ Transaction List */}
        <TransactionList
          transactions={latestTransactions}
          onDeleteTransaction={handleDeleteTransaction}
          history={false}
        />
      </div>
    </div>
  );
}
