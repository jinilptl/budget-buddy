import { useState } from 'react';
import { Edit, Trash2, Filter, Search } from 'lucide-react';

export function TransactionList({ transactions, onEditTransaction, onDeleteTransaction }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredAndSortedTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || transaction.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const aValue = sortBy === 'date' ? new Date(a.date).getTime() : a.amount;
      const bValue = sortBy === 'date' ? new Date(b.date).getTime() : b.amount;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
        
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th 
                className="text-left py-3 px-2 font-medium text-gray-700 cursor-pointer hover:text-teal-600"
                onClick={() => handleSort('date')}
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Category</th>
              <th 
                className="text-left py-3 px-2 font-medium text-gray-700 cursor-pointer hover:text-teal-600"
                onClick={() => handleSort('amount')}
              >
                Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Type</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Description</th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-sm text-gray-600">
                  {formatDate(transaction.date)}
                </td>
                <td className="py-3 px-2 text-sm text-gray-900">
                  {transaction.category}
                </td>
                <td className={`py-3 px-2 text-sm font-medium ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'expense' ? '-' : '+'}{formatAmount(transaction.amount)}
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="py-3 px-2 text-sm text-gray-600 max-w-xs truncate">
                  {transaction.description || '-'}
                </td>
                <td className="py-3 px-2 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEditTransaction(transaction)}
                      className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
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
        {filteredAndSortedTransactions.map((transaction) => (
          <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-gray-900">{transaction.category}</p>
                <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEditTransaction(transaction)}
                  className="p-2 text-gray-400 hover:text-teal-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className={`text-lg font-medium ${
                transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
              }`}>
                {transaction.type === 'expense' ? '-' : '+'}{formatAmount(transaction.amount)}
              </span>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                transaction.type === 'income' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {transaction.type}
              </span>
            </div>
            
            {transaction.description && (
              <p className="text-sm text-gray-600 mt-2">{transaction.description}</p>
            )}
          </div>
        ))}
      </div>

      {filteredAndSortedTransactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No transactions found</p>
        </div>
      )}
    </div>
  );
}