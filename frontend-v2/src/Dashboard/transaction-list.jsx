// Transactions List Component
import { TransactionItem } from "./transaction";
export const TransactionsList = () => {
    const transactions = [
      {
        id: 1,
        type: 'credit',
        name: 'Received from John Doe',
        date: 'Mar 15, 2025',
        amount: 850.00,
        category: 'Transfer',
        status: 'completed'
      },
      {
        id: 2,
        type: 'debit',
        name: 'Sent to Jane Smith',
        date: 'Mar 14, 2025',
        amount: 250.00,
        category: 'Payment',
        status: 'pending'
      },
      {
        id: 3,
        type: 'credit',
        name: 'Salary Deposit',
        date: 'Mar 13, 2025',
        amount: 3500.00,
        category: 'Income',
        status: 'completed'
      }
    ];
  
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
            <div className="flex items-center gap-4">
              <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                <option>All Categories</option>
                <option>Transfer</option>
                <option>Income</option>
                <option>Expense</option>
              </select>
              <a href="#" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                View all
              </a>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              {...transaction}
            />
          ))}
        </div>
      </div>
    );
  };