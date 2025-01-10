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

export const Signup = () => {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [pin, setPin] = useState(["", "", "", ""]);
    const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // Validate all required fields
        if (!firstName || !lastName || !username || !password || pin.includes("")) {
            alert("All fields are required");
            return;
        }

        // Check if PINs match
        if (pin.join('') !== confirmPin.join('')) {
            alert("PINs do not match");
            return;
        }

        try {
            // Make the API request
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                username,
                firstName,
                lastName,
                password,
                pin: pin.join(''),
            });

            // Save token to localStorage and navigate to dashboard
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            // Log the error and show an alert
            console.error("Signup failed:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div>
            <AppBar />
            <div
                className="bg-cover bg-center bg-no-repeat h-screen flex justify-center"
                style={{ backgroundImage: 'url(bg-signup.jpg)' }}
            >
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white text-center p-2 h-max px-4 shadow-lg">
                        <Heading label={"Sign Up"} />
                        <SubHeading label={"Enter your information to create an account"} />
                        
                        {/* Input Fields */}
                        <InputBox
                            onChange={e => setFirstname(e.target.value)}
                            placeholder="John"
                            label={"First Name"}
                        />
                        <InputBox
                            onChange={e => setLastName(e.target.value)}
                            placeholder="Doe"
                            label={"Last Name"}
                        />
                        <InputBox
                            onChange={e => setUserName(e.target.value)}
                            placeholder="aadil@gmail.com"
                            label={"Email"}
                        />
                        <InputBoxPass
                            onChange={e => setPassword(e.target.value)}
                            placeholder="******"
                            label="Password"
                            type="password"
                        />

                        {/* PIN Input */}
                        <InputBoxPin
                            label={"Create PIN"}
                            pin={pin}
                            setPin={setPin}
                        />
                        <InputBoxPin
                            label={"Confirm PIN"}
                            pin={confirmPin}
                            setPin={setConfirmPin}
                        />

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button onClick={handleSubmit} label={"Sign up"} />
                        </div>

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
