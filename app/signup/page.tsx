"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export default function Signup() {
    const router = useRouter();
    const [error, setError] = React.useState(false)
 
    const [user, setUser] = React.useState({
        email: "",
        phoneNumber: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    

    const onSignup = async () => {
     
        
        try {
            setLoading(true);
         
            const response = await axios.post("/api/users/signup", user);
             setError(false)
             
            console.log("Signup success", response.data);
            router.push("/login");

            
            
        } catch (error:any) {
        
            console.log("Signup failed", error.message);
            toast.error(error.message);
 
           setError(true)
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const key =/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
        const phone_key = /^\+?[0-9()-\s]{8,}$/;
        if(user.email.length > 0 && key.test(user.email) && user.password.length > 5 && phone_key.test(user.phoneNumber) && user.username.length > 2) {
            setError(false)
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
    <div className="flex flex-col items-center justify-center  min-h-screen py-2 bg-white">
        <h1 className="text-black mb-4 text-3xl">{loading ? "Processing..." : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="phoneNumber"
            type="string"
            value={user.phoneNumber}
            onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
            placeholder="Phone Number"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={((e) => setUser({...user, password: e.target.value}) ) }
            placeholder="password"
            />

            {
                error && <p className="text-red-600 text-sm "> User is already registered !!!  Or Please enter correct email !! </p>
                
            }

            <button
            onClick={onSignup}
            className="p-2 mt-3 border border-gray-300 rounded-lg mb-4 focus:outline-none text-black focus:border-gray-600">{buttonDisabled ? "" : "Signup"}</button>
            <Link href="/login" className="text-black">Visit login page</Link>
        </div>
    )

}