import { Edit, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { useNavigate } from "react-router-dom";

export function TransactionList({deleteTransactionApiCall}) {
  const { Transactions, deleteTransaction ,setTransactions,getSummery} = useContext(TransactionContext);
  console.log("transaction is  ", Transactions);

  const navigate = useNavigate();

  

  

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Transactions
        </h2>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-700">
                Date
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">
                Category
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">
                Amount
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">
                Type
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">
                Description
              </th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Transactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-2 text-sm text-gray-600">
                  {formatDate(transaction.transactionDate)}
                </td>
                <td className="py-3 px-2 text-sm text-gray-900">
                  {transaction.category}
                </td>
                <td
                  className={`py-3 px-2 text-sm font-medium ${
                    transaction.transactionType === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.transactionType === "expense" ? "-" : "+"}
                  {formatAmount(transaction.amount)}
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.transactionType === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.transactionType}
                  </span>
                </td>
                <td className="py-3 px-2 text-sm text-gray-600 max-w-xs truncate">
                  {transaction.description || "-"}
                </td>
                <td className="py-3 px-2 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/home/edit-transaction/${transaction._id}`)
                      }
                      className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteTransactionApiCall(transaction._id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {Transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-gray-900">
                  {transaction.category}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(transaction.transactionDate)}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    navigate(`/home/edit-transaction/${transaction._id}`)
                  }
                  className="p-2 text-gray-400 hover:text-teal-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteTransactionApiCall(transaction._id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`text-lg font-medium ${
                  transaction.transactionDate === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.transactionDate === "expense" ? "-" : "+"}
                {formatAmount(transaction.amount)}
              </span>
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  transaction.transactionType === "income"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {transaction.transactionType}
              </span>
            </div>

            {transaction.description && (
              <p className="text-sm text-gray-600 mt-2">
                {transaction.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {Transactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No transactions found</p>
        </div>
      )}
    </div>
  );
}
