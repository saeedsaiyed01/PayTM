
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
export const Signup = () => {

const [firstName , setFirstname] = useState("");
const [lastName , setLastName] = useState("");
const [username , setUserName] = useState("");
const [password , setPassword] = useState("");
const navigate = useNavigate()


    return (
    <div>  <AppBar />
    <div className="bg-black h-screen flex justify-center">
        
     
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 ">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox onChange={e =>{
                    setFirstname(e.target.value);
                }
                }  placeholder="John" label={"Firat Name"} />
                <InputBox onChange={(e)=>{
                    setLastName(e.target.value);
                }} placeholder="Doe" label={"Last Name"} />
                <InputBox onChange={(e)=>{
                    setUserName(e.target.value);
                }} placeholder="aadil@gmail.com" label={"Email"} />
                <InputBoxPass
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                label="Password"
                type="password"
            />
                <div className="pt-4">
                    <Button onClick={async()=>{
                const response = await  axios.post("http://localhost:3000/api/v1/user/signup", {
                     username,
                     firstName,
                     lastName,
                     password
                     });
                     localStorage.setItem("token" , response.data.token)
                     navigate("/dashboard")
                    }} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Signin"} to={"/signin"} />

            </div>

        </div>

    </div>
    </div>
    )
}