import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

            if (response.data.success) {
                setToken(response.data.token);
                toast.success("Login successful!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-2">Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Your email"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-medium mb-2">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Your password"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
