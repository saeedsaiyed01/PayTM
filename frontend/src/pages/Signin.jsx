import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppBar } from '../components/Appbar';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWar';
import InputBoxPass from '../components/InputBoxPass';

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [captchaImage, setCaptchaImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fetch CAPTCHA image on component mount
    useEffect(() => {
        fetchCaptcha();
    }, []); // Only fetch CAPTCHA once on mount

    const fetchCaptcha = async () => {
        try {
            const response = await axios.get('https://paytmkaro-01.onrender.com/api/v1/captcha/captcha', { withCredentials: true });
            setCaptchaImage(response.data);
            // Store CAPTCHA text in localStorage or sessionStorage
            sessionStorage.setItem('captcha', response.data.captcha); // Store the actual CAPTCHA text
        } catch (err) {
            console.error('Failed to load CAPTCHA', err);
            setCaptchaImage(null);
        }
    };

    const handleSignIn = async () => {
        if (!username || !password || !captcha) {
            setError('Please fill in all fields.');
            return;
        }

        // Retrieve CAPTCHA from sessionStorage
        const storedCaptcha = sessionStorage.getItem('captcha');

        if (captcha !== storedCaptcha) {
            setError('CAPTCHA is incorrect. Please try again.');
            fetchCaptcha(); // Refresh CAPTCHA on error
            return;
        }

        try {
            const response = await axios.post('https://paytmkaro-01.onrender.com/api/v1/user/signin', {
                username,
                password,
                captcha,
            }, { withCredentials: true }); // Ensure credentials are included

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token); 
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Sign-in error:', err); // Log detailed error
            const errorMessage = err.response?.data?.message || 'Sign in failed. Please try again.';
            setError(errorMessage);
            fetchCaptcha(); // Refresh CAPTCHA on error to encourage a new attempt
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
                        <div className="pt-4">
                            {captchaImage ? (
                                <div>
                                    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(captchaImage)}`} alt="CAPTCHA" className="mb-4" />
                                    <Button onClick={fetchCaptcha} label="Refresh CAPTCHA" />
                                </div>
                            ) : (
                                <p>Loading CAPTCHA...</p>
                            )}
                            <InputBox
                                onChange={(e) => setCaptcha(e.target.value)}
                                placeholder="Enter CAPTCHA"
                                value={captcha}
                                label="CAPTCHA"
                            />
                            {error && <p className="text-red-500">{error}</p>}
                            <div className='mt-4'>
                                <Button onClick={handleSignIn} label="Sign in" />
                            </div>
                        </div>
                        <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
                    </div>
                </div>
            </div>
        </div>
    );
};
