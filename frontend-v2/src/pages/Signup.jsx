// src/components/Signup.jsx
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/Appbar";
import { BottomWarning } from "../components/BottomWar";
import { InputBox } from "../components/InputBox";
import InputBoxPass from "../components/InputBoxPass";
import { InputBoxPin } from "../components/InputBoxPin";

const API_URL = "http://localhost:3000";

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    pin: ["", "", "", ""],
    confirmPin: ["", "", "", ""],
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate a single field on blur
  const handleBlur = (field, value) => {
    let error = "";
    if (!value.trim()) {
      error = `${field} is required`;
    } else if (field === "username" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email format";
    } else if (field === "password" && value.length < 6) {
      error = "Password must be at least 6 characters";
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Validate the entire form on submit
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.username.trim()) newErrors.username = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) newErrors.username = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.pin.includes("")) newErrors.pin = "All PIN fields are required";
    if (formData.confirmPin.includes("")) newErrors.confirmPin = "All confirm PIN fields are required";
    if (formData.pin.join("") !== formData.confirmPin.join("")) newErrors.confirmPin = "PINs do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    try {
      const { firstName, lastName, username, password, pin } = formData;
      const response = await axios.post(`${API_URL}/api/v1/user/signup`, {
        username,
        firstName,
        lastName,
        password,
        pin: pin.join(""),
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: error.response?.data?.message || "Signup failed. Please try again.",
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <AppBar />
      <div className="flex items-center justify-center flex-grow">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          className="w-96 bg-white shadow-lg m-6 p-5 rounded-xl border border-gray-200"
        >
          <h2 className="text-blue-600 text-xl font-bold text-center">Sign Up</h2>
          <p className="text-gray-500 text-center mb-4">Create your account</p>
          <div className="space-y-3">
            <InputBox
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              onBlur={(e) => handleBlur("firstName", e.target.value)}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            <InputBox
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              onBlur={(e) => handleBlur("lastName", e.target.value)}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            <InputBox
              label="Email"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              onBlur={(e) => handleBlur("username", e.target.value)}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            <InputBoxPass
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onBlur={(e) => handleBlur("password", e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            <InputBoxPin
              label="Create PIN"
              pin={formData.pin}
              setPin={(value) => setFormData({ ...formData, pin: value })}
            />
            {errors.pin && <p className="text-red-500 text-sm">{errors.pin}</p>}
            <InputBoxPin
              label="Confirm PIN"
              pin={formData.confirmPin}
              setPin={(value) => setFormData({ ...formData, confirmPin: value })}
            />
            {errors.confirmPin && <p className="text-red-500 text-sm">{errors.confirmPin}</p>}
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition duration-300 text-sm"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            {errors.form && <p className="text-red-500 text-sm mt-2">{errors.form}</p>}
          </div>
          <BottomWarning label="Already have an account?" buttonText="Sign In" to="/signin" />
        </motion.div>
      </div>
    </div>
  );
};
