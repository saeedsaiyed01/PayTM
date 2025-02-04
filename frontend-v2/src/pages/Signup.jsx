import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/Appbar";
import { BottomWarning } from "../components/BottomWar";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import InputBoxPass from "../components/InputBoxPass";
import { InputBoxPin } from "../components/InputBoxPin";
import { SubHeading } from "../components/SubHeading";

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

    // Validation Functions
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Real-time Validation
        if (field === "username" && !validateEmail(value)) {
            setErrors((prev) => ({ ...prev, username: "Invalid email format" }));
        } else if (field === "username") {
            setErrors((prev) => ({ ...prev, username: "" }));
        }

        if (field === "password" && !validatePassword(value)) {
            setErrors((prev) => ({
                ...prev,
                password: "Password must be at least 6 characters",
            }));
        } else if (field === "password") {
            setErrors((prev) => ({ ...prev, password: "" }));
        }
    };

    const handlePinChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === "confirmPin" && value.join("") !== formData.pin.join("")) {
            setErrors((prev) => ({ ...prev, confirmPin: "PINs do not match" }));
        } else if (field === "confirmPin") {
            setErrors((prev) => ({ ...prev, confirmPin: "" }));
        }
    };

    const handleSubmit = async () => {
        const { firstName, lastName, username, password, pin, confirmPin } = formData;

        // Check for Empty Fields
        if (!firstName || !lastName || !username || !password || pin.includes("")) {
            setErrors((prev) => ({ ...prev, form: "All fields are required" }));
            return;
        }

        // Final PIN Match Validation
        if (pin.join("") !== confirmPin.join("")) {
            setErrors((prev) => ({ ...prev, confirmPin: "PINs do not match" }));
            return;
        }

        try {
            // Make the API request
            const response = await axios.post(`${API_URL}/api/v1/user/signup`, {
                username,
                firstName,
                lastName,
                password,
                pin: pin.join(""),
            });

            // Save token to localStorage and navigate to dashboard
            localStorage.setItem("token", response.data.token);
            navigate("/hero");
        } catch (error) {
            console.error("Signup failed:", error.response?.data || error.message);
            setErrors((prev) => ({
                ...prev,
                form: error.response?.data?.message || "Signup failed. Please try again.",
            }));
        }
    };

    return (
        <div className="h-screen ">
            <AppBar />
            <div
                className="bg-cover bg-center bg-no-repeat h-screen flex p-0  justify-center"
                style={{ backgroundColor:'#0e1111'}}>
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white text-center  h-max px-4 shadow-lg">
                        <Heading label={"Sign Up"} />
                        <SubHeading label={"Enter your information to create an account"} />

                        {/* Input Fields */}
                        <InputBox
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder="John"
                            label={"First Name"}
                            value={formData.firstName}
                        />
                        <InputBox
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            placeholder="Doe"
                            label={"Last Name"}
                            value={formData.lastName}
                        />
                        <InputBox
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            placeholder="aadil@gmail.com"
                            label={"Email"}
                            value={formData.username}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">{errors.username}</p>
                        )}

                        <InputBoxPass
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            placeholder="******"
                            label="Password"
                            type="password"
                            value={formData.password}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}

                        {/* PIN Input */}
                        <InputBoxPin
                            label={"Create PIN"}
                            pin={formData.pin}
                            setPin={(value) => handlePinChange("pin", value)}
                        />
                        <InputBoxPin
                            label={"Confirm PIN"}
                            pin={formData.confirmPin}
                            setPin={(value) => handlePinChange("confirmPin", value)}
                        />
                        {errors.confirmPin && (
                            <p className="text-red-500 text-sm">{errors.confirmPin}</p>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button onClick={handleSubmit} label={"Sign up"} />
                        </div>

                        {/* Form-Level Error */}
                        {errors.form && (
                            <p className="text-red-500 text-sm mt-2">{errors.form}</p>
                        )}

                        {/* Bottom Warning */}
                        <BottomWarning
                            label={"Already have an account?"}
                            buttonText={"Signin"}
                            to={"/signin"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
