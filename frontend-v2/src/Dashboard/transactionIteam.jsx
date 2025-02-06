// TransactionItem.jsx
import React from 'react';

// Utility function for number formatting
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const TransactionItem = ({ type, name, date, amount, category, status }) => {
  const isCredit = type === 'credit';

  // Styles based on status
  const statusStyles = {
    completed: "bg-green-50 text-green-600",
    pending: "bg-yellow-50 text-yellow-600",
    failed: "bg-red-50 text-red-600"
  };

  return (
    <div className="flex items-center justify-between py-4 hover:bg-gray-50 px-4 rounded-lg transition-colors">
      {/* Left section: Icon and Transaction Details */}
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isCredit ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          {isCredit ? '↓' : '↑'}
        </div>
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      {/* Right section: Amount and Status */}
      <div className="text-right">
        <p className={`font-medium ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
          {isCredit ? '+' : '-'}{formatCurrency(amount)}
        </p>
        <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
    </div>
  );
};
