import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import your components
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Dashboard from './components/dashboard.jsx'; 
import Navbar from './components/navbar.jsx'; // Assuming this is your NavBar

// --- New ProtectedRoute Component ---
// This component checks for the access token before rendering the Dashboard
const ProtectedRoute = ({ children }) => {
    // Check if the access token exists in localStorage
    const isAuthenticated = !!localStorage.getItem('access_token');
    
    // If authenticated, render the children (the Dashboard)
    // If not, redirect to the login page
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    // Wrap your app with the Router
    <Router>
        <div className="App">
            {/* The Navbar will appear on all pages */}
            <Navbar /> 
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Route: Only accessible if logged in */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </div>
    </Router>
  );
}

export default App;