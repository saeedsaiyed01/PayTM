import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddBalanceButton from './AddBalanceButton';

export const Balance = () => {
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
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="font-bold text-lg">YOUR BALANCE</div>
        <div className="font-semibold ml-4 text-lg">
          {balance !== null ? `RS ${balance}` : 'Loading...'}
        </div>
      </div>
      <div className="flex justify-end">
        <AddBalanceButton />
      </div>
    </div>
  );
};
