import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AppBar } from '../components/Appbar';
import { BottomWarning } from '../components/BottomWar';
import { InputBox } from '../components/InputBox';
import PinInput from '../components/PinInput';

const AddBalancePage = () => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [balance, setBalance] = useState(null);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // State to track payment success

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT in localStorage
                    
                    }
                        

                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };
        console.log(localStorage.getItem('token')); // Check if the token is stored
        fetchBalance();
    }, []);

    const handlePinSubmit = async (pin) => {
        const parsedAmount = parseFloat(amount);
    
        if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
    
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/addBalance",
                { amount: parsedAmount, pin },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
    
            if (response.status === 200) {
                const { newBalance } = response.data;
    
                setBalance(parseFloat(newBalance));
                setIsPaymentSuccessful(true);
                setError('');
            } else {
                setError('Error adding balance, please try again.');
            }
        } catch (error) {
            console.error('API call error:', error);
            setError('Error adding balance, please try again.');
        }
    };
    
    return (
        <div>
            <AppBar />
            <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center"
  style={{ backgroundImage: 'url(bg.jpg)' }}>
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-[rgb(255,255,255)] text-center p-4 border border-gray-200">
                        <h2 className="text-xl font-bold mb-2 mt-5 text-black ">Add Balance</h2>
                        <InputBox
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="100"
                            label="Amount"
                        />
                    <div className="text-sm font-medium text-left py-2"> {/* Added margin here */}
                            <p className="mb-2 text-gray-700">Enter Pin:</p> {/* Added Enter Pin label */}
                            <PinInput onSubmit={handlePinSubmit} />
                        </div>

                        {error && <p className="mt-2 text-red-500">{error}</p>}

                        {isPaymentSuccessful && (
                            <>
                                <p className="mt-2 text-green-500">Updated Balance: RS {balance.toFixed(2)}</p>
                                <div className="pt-4">
                                    <BottomWarning label="Payment Successful. Back to dashboard" buttonText="Dashboard" to="/dashboard" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBalancePage;
