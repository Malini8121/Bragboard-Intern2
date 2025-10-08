import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    // --- 1. Form State Management (CRUCIAL WEEK 2 UPDATE) ---
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        department: "", // <-- NEW: Required by DB Schema
        role: "employee", // <-- NEW: Default role is employee
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        
        try {
            // Placeholder/Actual Registration Logic
            const { data } = await axios.post("http://192.168.1.100:8000/auth/register", formData);
            
            setSuccessMessage("Registration successful! Redirecting to login...");
            
            setTimeout(() => {
                navigate("/login"); 
            }, 1500);

        } catch(error){
            setError(error.response?.data?.detail || "Network error or server unavailable. Please try again.");
        }
    };

    // --- 2. Component JSX (FIXED: Using Inline Styles for Submission) ---
    return (
        <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6'}}>
            <div style={{backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', width: '100%', maxWidth: '400px'}}> 

                <h2 style={{fontSize: '24px', fontWeight: '800', textAlign: 'center', marginBottom: '24px', color: '#2563eb'}}>Join BragBoard</h2>
                
                {error && <p style={{color: 'red', textAlign: 'center', marginBottom: '16px'}}>{error}</p>}
                {successMessage && <p style={{color: 'green', textAlign: 'center', marginBottom: '16px'}}>{successMessage}</p>}

                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    
                    {/* Username Field */}
                    <input type="text" name="username" placeholder="Full Name / Username" value={formData.username} onChange={handleChange} 
                        style={{padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', width: '100%'}} required />
                    
                    {/* Email Field */}
                    <input type="email" name="email" placeholder="Work Email" value={formData.email} onChange={handleChange}
                        style={{padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', width: '100%'}} required />

                    {/* Department Field (NEW REQUIRED FIELD) */}
                    <input type="text" name="department" placeholder="Your Department (e.g., Marketing, Tech)" value={formData.department} onChange={handleChange}
                        style={{padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', width: '100%'}} required />

                    {/* Password Field */}
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                        style={{padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', width: '100%'}} required />
                    
                    {/* Register Button */}
                    <button type="submit"
                        style={{width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '12px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '16px'}}>
                        Register Account
                    </button>
                </form>

                {/* Link to Login */}
                <p style={{textAlign: 'center', fontSize: '14px', color: '#4b5563', marginTop: '16px'}}>
                    Already have an account? <Link to="/login" style={{color: '#2563eb', fontWeight: '500'}}>Log in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;