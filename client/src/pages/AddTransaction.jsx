import React, { useEffect, useState } from 'react';
import ShowSuccess from '../components/ShowSuccess';
import { useNavigate } from 'react-router-dom';


export default function AddTransaction() {
  const [isIncome, setIsIncome] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category:"",
    transactionType: isIncome ? 'income' : 'expense',
    transactionDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlecategory=(categoryname)=>{
    setSelectedCategory(categoryname);
    setFormData((prev)=>{
      return {...prev, category: categoryname}
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
    // handleSuccess();
  };

  const expenseCategories = [
    { name: 'Food & Dining', color: 'bg-orange-100 text-orange-600' },
    { name: 'Transportation', color: 'bg-blue-100 text-blue-600' },
    { name: 'Shopping', color: 'bg-purple-100 text-purple-600' },
    { name: 'Bills & Utilities', color: 'bg-red-100 text-red-600' },
    { name: 'Housing', color: 'bg-green-100 text-green-600' },
    { name: 'Healthcare', color: 'bg-pink-100 text-pink-600' },
    { name: 'Education', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Entertainment', color: 'bg-yellow-100 text-yellow-600' }
  ];

  const incomeCategories = [
    { name: 'Salary', color: 'bg-green-100 text-green-600' },
    { name: 'Freelance', color: 'bg-blue-100 text-blue-600' },
    { name: 'Investment', color: 'bg-purple-100 text-purple-600' },
    { name: 'Gift', color: 'bg-pink-100 text-pink-600' }
  ];

  const categories = isIncome ? incomeCategories : expenseCategories;

  const goBack = () => {
    // Navigation logic - go back to previous page
    console.log('Navigate back');
    navigate('/home')
  };

  const handleSuccess = () => {
    setShowSuccess(true);
    // After showing success, go back to main page
    setTimeout(() => {
      setShowSuccess(false);
      goBack();
    }, 1500);
  };

 
  return (
    
    
    <>
    {/* if showsuccess true then showing a page of success . */}
      {showSuccess && <ShowSuccess isIncome={isIncome} />}

      <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* back arrow */}
        <button 
          onClick={goBack}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <h1 className="text-xl font-bold">Add Transaction</h1>
        <div className="w-9"></div>
      </div>


      <form className="space-y-6" onSubmit={(e)=>{handleSubmit(e)}}>
        {/* Transaction Type Toggle */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <label className="font-medium">Transaction Type</label>
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${!isIncome ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                  Expense
                </span>
                <button
                  type="button"
                  onClick={() => setIsIncome(!isIncome)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isIncome ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isIncome ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm ${isIncome ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                  Income
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <label className="font-medium mb-3 block">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-500">
                $
              </span>
              <input
                type="number"
                step="1.00"
                min={0}
                name='amount'
                required
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="pl-8 text-2xl font-bold h-16 text-center w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <label className="font-medium mb-3 block">Category</label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => {
                const isSelected = selectedCategory === category.name;
                
                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => handlecategory(category.name)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? `${category.color} border-current shadow-md`
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      {/* Category Icons */}
                      {category.name === 'Food & Dining' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"/>
                        </svg>
                      )}
                      {category.name === 'Transportation' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM7 17h10M5 17H3a2 2 0 01-2-2v-3a1 1 0 011-1h1l2-4h9l2 4h1a1 1 0 011 1v3a2 2 0 01-2 2h-2"/>
                        </svg>
                      )}
                      {category.name === 'Shopping' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 8H6L5 9z"/>
                        </svg>
                      )}
                      {category.name === 'Bills & Utilities' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                        </svg>
                      )}
                      {category.name === 'Housing' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                      )}
                      {category.name === 'Healthcare' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                      )}
                      {category.name === 'Education' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                        </svg>
                      )}
                      {category.name === 'Entertainment' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                      )}
                      {category.name === 'Salary' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
                        </svg>
                      )}
                      {category.name === 'Freelance' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      )}
                      {category.name === 'Investment' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                        </svg>
                      )}
                      {category.name === 'Gift' && (
                        <svg className={`w-6 h-6 ${isSelected ? '' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                        </svg>
                      )}
                      <span className={`text-sm font-medium ${isSelected ? '' : 'text-gray-600'}`}>
                        {category.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

       
        {/* Date Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <label className="font-medium mb-3 block">Date</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <input
                type="date"
                // required
                name="transactionDate"
                onChange={handleChange}
                value={formData.transactionDate}
                // defaultValue={new Date().toISOString().split('T')[0]}
                className="pl-10 h-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <label className="font-medium mb-3 block">Description (Optional)</label>
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

        {/* Photo Attachment */}
        {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <label className="font-medium mb-3 block">Receipt Photo (Optional)</label>
            <button
              type="button"
              className="w-full h-12 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Add Receipt Photo
            </button>
          </div>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          // onClick={handleSuccess}
          className={`w-full h-14 text-lg font-medium rounded-md text-white transition-colors ${
            isIncome
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
              : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
          }`}
        >
          Add {isIncome ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
    </>
  );
}