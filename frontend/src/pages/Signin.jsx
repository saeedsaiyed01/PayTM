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
            setCaptchaImage(response.data.captchaData); // Store the CAPTCHA SVG image data

            // Store the CAPTCHA text in localStorage
            console.log('Storing CAPTCHA text in localStorage:', response.data.captchaText); // Debugging
            localStorage.setItem('captchaText', response.data.captchaText);
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
    
        // Retrieve stored CAPTCHA from localStorage
        const storedCaptcha = localStorage.getItem('captchaText');
        console.log('Stored CAPTCHA text from localStorage:', storedCaptcha); // Debugging
        console.log('User-entered CAPTCHA:', captcha.trim()); // Debugging
    
        // Verify CAPTCHA
        if (captcha.trim() !== storedCaptcha) {
            setError('CAPTCHA is incorrect. Please try again.');
            fetchCaptcha(); // Refresh CAPTCHA on error
            return;
        }
    
        try {
            // Proceed with sign-in and send stored CAPTCHA along with the user input
            const response = await axios.post('https://paytmkaro-01.onrender.com/api/v1/user/signin', {
                username,
                password,
                captcha,  // User input
                captchaStored: storedCaptcha,  // Stored CAPTCHA from localStorage
            }, { withCredentials: true });
    
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token); 
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Error signing in:', err);
            const errorMessage = err.response?.data?.message || 'Sign in failed. Please try again.';
            setError(errorMessage);
            fetchCaptcha(); // Refresh CAPTCHA on error
        } finally {
            // Clear CAPTCHA from localStorage after sign-in attempt
            localStorage.removeItem('captchaText');
        }
    };
    
    return (
        <div>
            <AppBar />
            <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center"
                style={{ backgroundImage: 'url(bg.jpg)' }}>
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-[rgb(255,255,255)] text-center p-4 mt-5 ">
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
