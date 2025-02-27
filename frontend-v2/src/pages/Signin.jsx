// src/components/Signin.jsx
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar } from '../components/Appbar';
import { BottomWarning } from '../components/BottomWar';

export const Signin = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaImage, setCaptchaImage] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const navigate = useNavigate();

  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  // Fetch CAPTCHA
  const fetchCaptcha = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/captcha/captcha', {
        withCredentials: true,
      });
      setCaptchaImage(response.data.captchaData);
      localStorage.setItem('captchaText', response.data.captchaText);
    } catch (err) {
      console.error('Failed to load CAPTCHA', err);
    }
  };

  // Email validation
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleBlurEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
    } else if (!isValidEmail(email.trim())) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleBlurPassword = () => {
    if (!password.trim()) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleBlurCaptcha = () => {
    if (!captcha.trim()) {
      setCaptchaError('CAPTCHA is required');
    } else {
      setCaptchaError('');
    }
  };

  const handleSignIn = async () => {
    const trimmedEmail = email.trim();
    const trimmedCaptcha = captcha.trim();
    const storedCaptcha = localStorage.getItem('captchaText');

    if (!trimmedEmail || !password || !trimmedCaptcha) {
      setEmailError(!trimmedEmail ? 'Email is required' : '');
      setPasswordError(!password ? 'Password is required' : '');
      setCaptchaError(!trimmedCaptcha ? 'CAPTCHA is required' : '');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (trimmedCaptcha !== storedCaptcha) {
      setCaptchaError('CAPTCHA is incorrect');
      fetchCaptcha();
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/user/signin',
        {
          username: trimmedEmail,
          password,
          captcha: trimmedCaptcha,
          captchaStored: storedCaptcha,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setPasswordError('Sign in failed. Please try again.');
      fetchCaptcha();
    } finally {
      localStorage.removeItem('captchaText');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <AppBar />
      <div className="flex items-center justify-center h-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-80 bg-white shadow-xl p-6 m-10 rounded-2xl border border-gray-200"
        >
          <h2 className="text-blue-600 text-2xl font-bold text-center mb-2">Sign In</h2>
          <p className="text-gray-500 text-center mb-6">Welcome back! Enter your details.</p>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlurEmail}
          />
          {emailError && <p className="text-red-500 text-xs mb-2">{emailError}</p>}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleBlurPassword}
          />
          {passwordError && <p className="text-red-500 text-xs mb-2">{passwordError}</p>}

          {/* CAPTCHA */}
          {captchaImage && (
            <div className="flex justify-center mb-2">
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(captchaImage)}`}
                alt="CAPTCHA"
                className="w-40 h-12 border border-gray-300 rounded-lg"
              />
            </div>
          )}

          <input
            type="text"
            placeholder="Enter CAPTCHA"
            className="w-full p-3 mb-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            onBlur={handleBlurCaptcha}
          />
          {captchaError && <p className="text-red-500 text-xs mb-2">{captchaError}</p>}

          {/* Sign In Button */}
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 mt-2 rounded-lg transition duration-300 text-sm"
            onClick={handleSignIn}
          >
            Sign In
          </button>

          {/* Sign Up Redirect */}
          <BottomWarning label="Don't have an account?" buttonText="Sign Up" to="/signup" />
        </motion.div>
      </div>
    </div>
  );
};
