import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import user_icon from "../Assets/person.png"
import email_icon from "../Assets/email.png"
import password_icon from "../Assets/password.png"

const Register = () => {
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        const { data } = await axios.post("http://localhost:8000/auth/register", formData);
        console.log(data);
        alert("Registered successfully!");
        navigate("/login"); 
    } catch(error){
        console.error(error);
        if (error.response) {
            setError(error.response.data.detail || "Registration failed");
        } else {
            setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center align-center mt-6">
        <div className="bg-indigo-100 w-96 p-8 rounded-xl shadow-lg"> 

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center ">
            <img src={user_icon} alt="" className="mr-2"/>
            <input type="text" 
                name="username" 
                placeholder="Username" 
                value={formData.username} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required 
            />
        </div>
        <div className="flex items-center">
            <img src={email_icon} alt="" className="mr-2" />
            <input type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required 
          />
        </div>
        <div className="flex items-center">
            <img src={password_icon} alt="" className="mr-2"/>
            <input type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                required 
            />
        </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold">Register</button>
          </form>
    </div>
    </div>
  );
};

export default Register;