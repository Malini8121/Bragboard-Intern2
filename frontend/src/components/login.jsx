import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; 
const TOKEN_ENDPOINT = `${API_BASE_URL}/auth/token`; 

const Login = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Update form state on input change
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(null); 
    };

    // Convert JSON data to URL encoded form data
    const createFormUrlEncoded = (email, password) => {
        const params = new URLSearchParams();
        params.append('username', email); 
        params.append('password', password);
        return params.toString();
    };

    // Handle form submit login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const data = createFormUrlEncoded(formData.email, formData.password);

            const response = await axios.post(
                TOKEN_ENDPOINT, 
                data, 
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }
            );

            const token = response.data.access_token; 
            
            if (token) {
                localStorage.setItem('access_token', token);
                navigate('/dashboard'); 
            } else {
                setError("Login successful, but token missing. Contact support.");
            }

        } catch (err) {
            if (err.response) {
                const detail = err.response.data.detail;
                const errorMessage = (detail === "Unauthorized") 
                    ? "Invalid email or password." 
                    : detail || "Login failed due to server error.";
                setError(errorMessage);
            } else {
                setError("Network error or server unavailable. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Employee Login</h2>
                
                {error && <p className="text-red-500 text-sm text-center mb-4 p-2 bg-red-50 rounded-md border border-red-200">{error}</p>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Work Email" 
                        value={formData.email} 
                        onChange={handleFormChange} 
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        disabled={isLoading} 
                    />
                    
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleFormChange} 
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        disabled={isLoading} 
                    />

                    <button 
                        type="submit"
                        className={`w-full py-3 rounded-lg font-semibold text-white mt-2 transition duration-200 
                            ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`
                        }
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging In...' : 'Login'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
