import { useState } from "react";
import { BottomWarning } from "../components/BottomWar";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputBoxPass from "../components/InputBoxPass";
import { AppBar } from "../components/Appbar";
import { InputBoxPin } from "../components/InputBoxPin";

export const Signup = () => {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [pin, setPin] = useState(["", "", "", ""]);
    const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (pin.join('') !== confirmPin.join('')) {
            alert("PINs do not match");
            return;
        }

        const response = await axios.post("https://paytmkaro-01.onrender.com/api/v1/user/signup", {
            username,
            firstName,
            lastName,
            password,
            pin: pin.join(''),
        });

        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
    };

    return (
        <div>
            <AppBar />
            <div className="bg-[rgb(33,37,41)] h-screen flex justify-center">
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg  bg-[rgb(255,255,255)] text-center p-2 h-max px-4">
                        <Heading label={"Sign Up"} />
                        <SubHeading label={"Enter your information to create an account"} />
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
                        {/* Confirm PIN Input */}
                        <InputBoxPin
                            label={"Confirm PIN"}
                            pin={confirmPin}
                            setPin={setConfirmPin}
                        />
                        <div className="pt-4">
                            <Button onClick={handleSubmit} label={"Sign up"} />
                        </div>
                        <BottomWarning label={"Already have an account?"} buttonText={"Signin"} to={"/signin"} />
                    </div>
                </div>
            </div>
        </div>
    );
};