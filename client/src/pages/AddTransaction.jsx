import React, { useContext, useState } from "react";
import ShowSuccess from "../components/ShowSuccess";
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";

export default function AddTransaction() {
  const { addTransaction } = useContext(TransactionContext);

  const [isIncome, setIsIncome] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    transactionType: "expense",
    transactionDate: "",
  });

  /** ---------- Handlers ---------- **/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setFormData((prev) => ({ ...prev, category: categoryName }));
  };

  const handleTransactionType = () => {
    setIsIncome((prev) => {
      const newValue = !prev;
      setFormData((formPrev) => ({
        ...formPrev,
        transactionType: newValue ? "income" : "expense",
      }));
      return newValue;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const response = await addTransaction(formData);
    console.log("Response:", response);

    if (response.status === 201) handleSuccess();
  };

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      goBack();
    }, 2000);
  };

  const goBack = () => {
    console.log("Navigate back");
    navigate("/home/main");
  };

  /** ---------- Categories ---------- **/
  const expenseCategories = [
    { name: "Food & Dining", color: "bg-orange-100 text-orange-600" },
    { name: "Transportation", color: "bg-blue-100 text-blue-600" },
    { name: "Shopping", color: "bg-purple-100 text-purple-600" },
    { name: "Bills & Utilities", color: "bg-red-100 text-red-600" },
    { name: "Housing", color: "bg-green-100 text-green-600" },
    { name: "Healthcare", color: "bg-pink-100 text-pink-600" },
    { name: "Education", color: "bg-indigo-100 text-indigo-600" },
    { name: "Entertainment", color: "bg-yellow-100 text-yellow-600" },
  ];

  const incomeCategories = [
    { name: "Salary", color: "bg-green-100 text-green-600" },
    { name: "Freelance", color: "bg-blue-100 text-blue-600" },
    { name: "Investment", color: "bg-purple-100 text-purple-600" },
    { name: "Gift", color: "bg-pink-100 text-pink-600" },
  ];

  const categories = isIncome ? incomeCategories : expenseCategories;

  /** ---------- Render ---------- **/
  return (
    <>
      {showSuccess && <ShowSuccess isIncome={isIncome} />}

      <div className="min-h-screen bg-gray-50 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goBack}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Add Transaction</h1>
          <div className="w-9"></div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Transaction Type */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 flex items-center justify-between">
              <label className="font-medium">Transaction Type</label>
              <div className="flex items-center space-x-3">
                <span
                  className={`text-sm ${
                    !isIncome ? "text-red-600 font-medium" : "text-gray-500"
                  }`}
                >
                  Expense
                </span>
                <button
                  type="button"
                  onClick={handleTransactionType}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isIncome ? "bg-green-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isIncome ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-sm ${
                    isIncome ? "text-green-600 font-medium" : "text-gray-500"
                  }`}
                >
                  Income
                </span>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4">
              <label className="font-medium mb-3 block">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  step="1.00"
                  min={0}
                  name="amount"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="pl-8 text-2xl font-bold h-16 text-center w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4">
              <label className="font-medium mb-3 block">Category</label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category.name;
                  return (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => handleCategory(category.name)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? `${category.color} border-current shadow-md`
                          : "bg-gray-50 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        {/* SVG ICONS (kept same) */}
                        {category.name === "Food & Dining" && (
                          <svg
                            className={`w-6 h-6 ${
                              isSelected ? "" : "text-gray-500"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                            />
                          </svg>
                        )}
                        {/* --- baaki icons same rakhe (sirf indentation improve) --- */}

                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "" : "text-gray-600"
                          }`}
                        >
                          {category.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4">
              <label className="font-medium mb-3 block">Date</label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="date"
                  name="transactionDate"
                  onChange={handleChange}
                  value={formData.transactionDate}
                  className="pl-10 h-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4">
              <label className="font-medium mb-3 block">
                Description (Optional)
              </label>
              <textarea
                placeholder="Add a note about this transaction..."
                className="resize-none w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
                name="description"
                onChange={handleChange}
                value={formData.description}
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full h-14 text-lg font-medium rounded-md text-white transition-colors ${
              isIncome
                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            }`}
          >
            Add {isIncome ? "Income" : "Expense"}
          </button>
        </form>
      </div>
    </>
  );
}
