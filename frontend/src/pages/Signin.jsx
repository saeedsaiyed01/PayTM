import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppBar } from '../components/Appbar';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWar';
import InputBoxPass from '../components/InputBoxPass';
import CaptchaComponent from '../components/CaptchaComponent'; // Import the new component

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('https://paytmkaro-01.onrender.com/api/v1/user/signin', {
                username,
                password,
                captcha: localStorage.getItem('captchaText'), // Include CAPTCHA from local storage
            }, { withCredentials: true });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token); 
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Sign-in error:', err);
            const errorMessage = err.response?.data?.message || 'Sign in failed. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div>
            <AppBar />
            <div className="bg-[rgb(33,37,41)] h-screen flex justify-center">
                <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-[rgb(255,255,255)] text-center p-4">
                    <Heading label="Sign in" />
                    <SubHeading label="Enter your credentials to access your account" />
                    <InputBox
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Email"
                        value={username}
                        label="Email"
                    />
                    <InputBoxPass
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        value={password}
                        label="Password"
                        type="password"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <CaptchaComponent /> {/* Include the CAPTCHA component */}
                    <div className='mt-4'>
                        <Button onClick={handleSignIn} label="Sign in" />
                    </div>
                    <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
                </div>
                </div>
            </div>
        </div>
    );
};
