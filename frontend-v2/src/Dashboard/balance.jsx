// Balance Card Component
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Utility function for number formatting
import { useEffect, useState } from 'react';
import Growth from '../icons/growth';
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
          <div className='flex gap-20'>
          <div className="bg-purple-600 text-white px-6 py-4 rounded-2xl w-[500px]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white text-lg font-medium mt-1 ">Total Balance</p>
                <h3 className="text-3xl font-bold">
                  {balance !== null ? `$${Math.ceil(balance)}` : 'Loading...'}
                </h3>
                <div className="flex items-center text-md gap-2 text-white  mt-2">
      <span><Growth/>  </span>
      <p>+2.5% from last month</p>
    </div>
              </div>
              <button
                onClick={handleNavigate}
                className="text-black bg-gradient-to-br bg-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add Money
              </button>
              
            </div>
            <div className="flex items-center gap-2 text-indigo-200"></div>
          </div>

          <div className="bg-purple-600 text-white px-6 py-4 rounded-2xl w-[500px]">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-white text-lg font-medium mt-1">Send Money</p>
        <h3 className="text-2xl font-bold">Choose Recipient</h3>
        <button
          onClick={() => navigate('/tranfer')}
          className="mt-3 bg-gradient-to-br bg-white hover:bg-gradient-to-bl text-black font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  </div>
</div>
        );
      }        