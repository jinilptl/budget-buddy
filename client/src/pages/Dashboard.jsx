import { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { SummaryCard } from "../components/SummaryCard.jsx";
import { TransactionList } from "../components/TransactionList.jsx";
import { Link } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext.jsx";

export function Dashboard() {
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      amount: 3000,
      type: "income",
      category: "Salary",
      description: "Monthly salary",
      date: "2025-01-01",
    },
    {
      id: "2",
      amount: 150,
      type: "expense",
      category: "Food & Dining",
      description: "Grocery shopping",
      date: "2025-01-02",
    },
    {
      id: "3",
      amount: 50,
      type: "expense",
      category: "Transportation",
      description: "Gas station",
      date: "2025-01-03",
    },
    {
      id: "4",
      amount: 500,
      type: "income",
      category: "Freelance",
      description: "Web design project",
      date: "2025-01-04",
    },
    {
      id: "5",
      amount: 80,
      type: "expense",
      category: "Entertainment",
      description: "Movie tickets",
      date: "2025-01-05",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const { getSummery } = useContext(TransactionContext);

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
  }, []);

  // const editTransaction = (transaction) => {
  //   setEditingTransaction(transaction);
  //   setIsFormOpen(true);
  // };

  // const updateTransaction = (updatedTransaction) => {
  //   if (editingTransaction) {
  //     setTransactions((prev) =>
  //       prev.map((t) =>
  //         t.id === editingTransaction.id
  //           ? { ...updatedTransaction, id: editingTransaction.id }
  //           : t
  //       )
  //     );
  //     setEditingTransaction(null);
  //   }
  // };

  // const deleteTransaction = (id) => {
  //   if (confirm("Are you sure you want to delete this transaction?")) {
  //     setTransactions((prev) => prev.filter((t) => t.id !== id));
  //   }
  // };


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
        <TransactionList transactions={transactions}/>
      </div>
    </div>
  );
}
