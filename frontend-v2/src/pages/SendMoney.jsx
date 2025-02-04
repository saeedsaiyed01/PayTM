import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BottomWarning } from '../components/BottomWar';
import PinInput from '../components/PinInput';

const API_URL = "http://localhost:3000";

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: {
                delay: i * 0.2,
                type: "spring",
                duration: 1.5,
                bounce: 0.2,
                ease: "easeInOut",
            },
            opacity: { delay: i * 0.2, duration: 0.2 },
        },
    }),
};

function Checkmark({ size = 100, strokeWidth = 2, color = "green", className = "" }) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
            className={className}
        >
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke={color}
                variants={draw}
                custom={0}
                style={{ strokeWidth, strokeLinecap: "round", fill: "transparent" }}
            />
            <motion.path
                d="M30 50L45 65L70 35"
                stroke={color}
                variants={draw}
                custom={1}
                style={{ strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", fill: "transparent" }}
            />
        </motion.svg>
    );
}

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [amount, setAmount] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/account/balance`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };
        fetchBalance();
    }, []);

    const handlePinSubmit = async (pin) => {
        if (!amount || isNaN(amount) || amount.startsWith('0') || amount > balance) {
            setError('Please enter a valid amount.');
            return;
        }

        setError('');

        try {
            const response = await axios.post(`${API_URL}/api/v1/account/transfer`, {
                to: id,
                amount: parseFloat(amount),
                pin
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });

            if (response.status === 200) {
                setIsSuccess(true);
                const audio = new Audio('/sounds/payment-successfull-audio.mp3');
                audio.play();
            }
        } catch (error) {
            console.error('Request failed', error);
            setError('Transfer failed. Please try again.');
        }
    };

    return (
        <div>
            <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center" style={{ backgroundImage: 'url(bg.jpg)' }}>
                <div className="h-full flex flex-col justify-center">
                    <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h2 className="text-3xl font-bold text-center text-black">Send Money</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                    <span className="text-2xl text-black">test</span>
                                    {/* // todo {name[0].toUpperCase()}  */}
                                </div>
                                <h3 className="text-2xl font-semibold text-black">{name}</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-black font-medium" htmlFor="amount">Amount (in Rs)</label>
                                    <input onChange={(e) => setAmount(e.target.value)} type="number" className="flex h-10 w-full rounded-md border px-3 py-2 text-sm" id="amount" placeholder="Enter amount" value={amount} />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                </div>
                                <PinInput onSubmit={handlePinSubmit} />
                                {isSuccess && (
                                    <div className="flex flex-col items-center">
                                        <Checkmark size={60} strokeWidth={4} color="green" className="mb-4" />
                                        <h3>Transfer Successful</h3>
                                        <BottomWarning label="Payment Successful. Back to dashboard" buttonText="Dashboard" to="/dashboard" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};