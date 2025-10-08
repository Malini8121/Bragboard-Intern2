import React, { useState, useEffect } from 'react';
import Navbar from './navbar'; // Assuming a Navbar component exists
import { useNavigate } from 'react-router-dom';

// frontend/src/components/home.jsx

const Home = () => {
  // Hook to programmatically navigate users
  const navigate = useNavigate();
  // State to hold user data, initialized to null
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    // 1. Check for Access Token for Authentication
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      // If no token is found, redirect to the login page
      navigate('/login');
      return; // Stop further execution in useEffect
    }

    // 2. SIMULATION: Displaying data without an API call
    // This section fulfills the requirement to show name and department.
    // In a real application, you would make an API call here
    // using 'fetch' or 'axios' with the 'token' in the headers
    // to securely fetch the actual user's profile data.
    
    const simulatedUserData = {
      name: "Malini [Tech Lead]",
      department: "Engineering"
    };

    setUserData(simulatedUserData);
    
    // The previous code had a stray 'navigate()' here, which is removed.
    // Navigation is only needed if the token is missing.

  }, [navigate]); // Dependency array includes 'navigate'

  // Conditional Rendering: Display a loading message until userData is available
  if (!userData) {
    return (
      <div>
        <Navbar />
        <p>Loading user profile...</p>
      </div>
    );
  }

  // Main Render: Display the Home component content
  return (
    <div>
      {/* 1. Navbar Component: Assuming it's the navigation bar */}
      <Navbar /> 

      {/* 2. Main Content */}
      <div style={{ padding: '20px' }}>
        <h2>Welcome Home!</h2>
        
        {/* Display User Data from the state */}
        <p>This is the inside the home component.</p>
        <p>Logged in user details (Simulated):</p>
        
        {/* Data is accessed from the userData state */}
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Department:</strong> {userData.department}</p>
        
        {/* You can add more content here, like a dashboard or recent activity */}
      </div>
    </div>
  );
};

export default Home;