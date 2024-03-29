"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";




export default function LoginPage() {

    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
      
    })

    const [buttonDisabled,setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)


    const onLogin = async() =>{
        try {
            setLoading(true)
          const response = await axios.post('/api/users/login', user);
          
            console.log('Login Success', response.data);
            toast.success('Login Success')
            
            router.push('/profile')
        } catch (error:any) {
            console.log("Login Failed", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
       if (user.email.length > 0 && user.password.length) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }  
    },[user])
    


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" :"signin" }</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                type="text" id="email" value={user.email} onChange={(e) => setUser({
                ...user, email: e.target.value
            
            })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                type="text" id="password" value={user.password} onChange={(e) => setUser({
                ...user, password: e.target.value
            
            })}
                placeholder="password"
            />
            <button
            onClick={onLogin}
                className="p-2 border boreder-grey-300 rounded-lg mb-4">{buttonDisabled? "no login":"login" }</button>
            <Link href="/signup">Visit Signup</Link>
        </div>
    )
}