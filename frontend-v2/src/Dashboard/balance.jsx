// Balance Card Component
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Utility function for number formatting
import { useEffect, useState } from 'react';
// const formatPercentage = (value) => {
//   return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
// };
export const BalanceCard = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate('/addBalance');
  };
    const [balance, setBalance] = useState(null);
    
        useEffect(() => {
          const fetchBalance = async () => {
            try {
              const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT in localStorage
                }
              });
              setBalance(response.data.balance);
            } catch (error) {
              console.error('Error fetching balance:', error);
            }
          };
      
          fetchBalance();
        }, []);
    return (
      <div className="bg-indigo-600 text-white p-8 rounded-2xl mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-indigo-200 text-sm font-medium mb-2">Total Balance</p>
           
            <h3 className="text-4xl font-bold">
            {balance !== null ? `RS ${Math.ceil(balance)}` : 'Loading...'}
              </h3>
          </div>
        
          <button onClick={handleNavigate} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Add Money
          </button>
        </div>
        <div className="flex items-center gap-2 text-indigo-200">
        
        </div>
      </div>
    );
  };
  