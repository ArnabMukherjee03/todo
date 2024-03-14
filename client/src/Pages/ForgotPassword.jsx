import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import { authContext } from '../Context/AuthContext';

const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const {handleReqForgotPass} = useContext(authContext);

    const handleSubmit = (e)=>{
        e.preventDefault();
        handleReqForgotPass({email: email});
    }

    return (
        <div className="font-primary min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <p className="text-gray-600 mb-6">Please enter your email address to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
                        <input type="email" id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} className="w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Reset Password</button>
                        <Link to="/login" className="text-blue-500 hover:underline">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
