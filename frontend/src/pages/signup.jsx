import { useState } from "react"
import {Button}from "../components/Button"
import {BottomWarning}from "../components/BottomWarning"
import {Heading}from "../components/Heading"
import {SubHeading}from "../components/SubHeading"
import {InputBox}from "../components/InputBox"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup=()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const url="https://paytm-backend-1ymy.onrender.com";
    const navigate=useNavigate();
    
    return (<div className="bg-slate-300 h-screen flex justify-center">
     <div className="flex flex-col justify-center">
         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Signup"}/>
            <SubHeading label={"Enter Your Information to create an account"}></SubHeading>
            <InputBox onChange={e => {
                setFirstName(e.target.value);
                }} placeholder="John" label={"First Name"} />
            <InputBox onChange={e => {
                setLastName(e.target.value);
                }} placeholder="Doe" label={"Last Name"} />
            <InputBox onChange={e => {
                setUsername(e.target.value);
                }} placeholder="johndoe@gmail.com" label={"Email "} />
            <InputBox onChange={e => {
                setPassword(e.target.value);
                }} placeholder="" label={"Password"} />
            <div className="pt-4">
                <Button onClick={async ()=>{
                    try{
                        const response=await axios.post(url+"/api/v1/user/signup",{
                        username,
                        firstName,
                        lastName,
                        password
                        })
                        if (response.data.token) {
                            localStorage.setItem("token",response.data.token);
                            navigate("/dashboard")
                        }
                        else{
                            alert(response.data.message || "Signup successful, but no token received.");
                        }
                    }
                    catch (error) {
                        alert(error.response?.data?.message || "An error occurred. Please try again.");
                    }
            }} label={"Sign up"} />
            </div>
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
         </div>
     </div>

    </div>);
};
