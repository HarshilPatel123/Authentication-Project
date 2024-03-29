"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = React.useState(false);
    const [user, setUser] = React.useState({
        email: "",
        phoneNumber: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/");
        }
        catch (error:any) {
            setError(true)
        }
        finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.phoneNumber.length === 10) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
        <h1 className="text-3xl mb-9">{loading ? "Processing..." : "Login"}</h1>
        <hr />
        
        <label className="flex text-black justify-start items-start"htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 active rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})} 
            placeholder="email"
            />
        <label className="text-black flex items-start" htmlFor="phoneNumber">Phone Number</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="phoneNumber"
            type="string"
            value={user.phoneNumber}
            onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
            placeholder="phoneNumber"
            />

            {
              error && <p className="text-sm text-red-600 "> Login Failed ! Either Email or Phone number is not registered !!</p>

            }

            <button
            onClick={onLogin}
            className="p-2 mt-5 border border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link className="text-black" href="/signup">Visit Signup page</Link>
        </div>
    )

}