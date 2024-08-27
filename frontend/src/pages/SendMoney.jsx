import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import { BottomWarning } from '../components/BottomWar';
import PinInput from '../components/PinInput'; // Import PinInput component
import { AppBar } from '../components/Appbar';
import { Balance } from '../components/Balance'; // Import the Balance component

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // State to track success status
    const [balance, setBalance] = useState(null); // State for balance
    const [error, setError] = useState(''); // State for error message

    // Fetch balance when component mounts
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('https://paytmkaro-01.onrender.com/api/v1/account/balance', {
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

    const handlePinSubmit = async (pin) => {
        // Validate amount before proceeding
        if (!amount || isNaN(amount) || amount.startsWith('0') || amount > balance) {
            setError('Please enter a valid amount.');
            return; // Prevent submission if validation fails
        }

        setError(''); // Clear any previous errors

        try {                                  
            const response = await axios.post("https://paytmkaro-01.onrender.com/api/v1/account/transfer", {
                to: id,
                amount: parseFloat(amount), // Convert to number for the request
                pin // Include the PIN in the request
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            if (response.status === 200) {
                // Handle successful transfer
                setIsSuccess(true);

                // Play sound on successful response
                const audio = new Audio('/sounds/payment-successfull-audio.mp3');
                audio.play();
            }
        } catch (error) {
            console.error('Request failed', error);
            setError('Transfer failed. Please try again.'); // Set error message if request fails
        }
    };

    return (
        <div>
            <AppBar />
            <div className="flex justify-center h-screen bg-[rgb(33,37,41)]">
                <div className="h-full flex flex-col justify-center">
                    <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-[rgb(255,255,255)] shadow-lg rounded-lg">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h2 className="text-3xl font-bold text-center text-black">Send Money</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                    <span className="text-2xl text-black">{name[0].toUpperCase()}</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-black">{name}</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="amount"
                                    >
                                        Amount (in Rs)
                                    </label>
                                    <input
                                        onChange={(e) => setAmount(e.target.value)}
                                        type="number"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        id="amount"
                                        placeholder="Enter amount"
                                        value={amount}
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>} {/* Show error message */}
                                </div>
                                <PinInput onSubmit={handlePinSubmit} /> {/* PinInput component added */}
                                {isSuccess && (
                                    <BottomWarning label="Payment Successful. Back to dashboard" buttonText="Dashboard" to="/dashboard" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
