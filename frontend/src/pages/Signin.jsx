import { useState } from "react"; // Import useState from React
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWar";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { AppBar } from "../components/Appbar";
import axios from "axios";
import InputBoxPass from "../components/InputBoxPass";

export const Signin = () => {
    
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            }); localStorage.setItem("token" , response.data.token)
            if (response.status === 200) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Sign-in error:", error);
            // Optionally, add error handling here to inform the user
        }
    };

    return (

        <div>
            <AppBar />
        <div className="bg-black h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox 
                        onChange={(e) => setUserName(e.target.value)} 
                        placeholder="aadil@gmail.com" 
                        label={"Email"} 
                    />
                       <InputBoxPass
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                label="Password"
                type="password"
            />
                    <div className="pt-4">
                        <Button onClick={handleSignIn} label={"Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
        </div>
    );
};
