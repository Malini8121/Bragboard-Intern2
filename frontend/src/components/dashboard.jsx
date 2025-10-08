import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 👈 Import for clean redirection

// 1. Placeholder for the Main Shout-Out Feed component (Milestone 2)
const ShoutOutFeed = () => (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Shout-Out Feed (Milestone 2)</h2>
        [cite_start]<p className="text-gray-600">The feed showing all shout-outs by tag/time will go here[cite: 60].</p>
        <p className="text-sm text-gray-500 mt-2">
            [cite_start]You will implement the Shout-Out posting and feed logic in Weeks 3-4[cite: 50, 51, 54].
        </p>
    </div>
);

const Dashboard = () => {
    // State to hold the logged-in user's information
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // 👈 Initialize useNavigate

    // Assuming the FastAPI backend is running at this URL
    // Use the base URL, assuming the user endpoint is /users/me
    const API_BASE_URL = 'http://127.0.0.1:8000'; // Adjusted to match common backend practice

    // --- Logout Function ---
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login'); // 👈 Use navigate for a cleaner redirect
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('access_token'); 

            if (!accessToken) {
                setError('Authentication token missing. Redirecting to login.');
                setLoading(false);
                // Redirect user if no token is found (Fallback for ProtectedRoute)
                navigate('/login'); 
                return;
            }

            try {
                // API call to the protected endpoint GET /users/me
                const response = await axios.get(`${API_BASE_URL}/users/me`, {
                    headers: {
                        // Use the access token for JWT authentication 
                        'Authorization': `Bearer ${accessToken}` 
                    }
                });
                
                // Set the user data (including name, role, department)
                setUser(response.data); 
                
            } catch (err) {
                console.error('Failed to fetch user data:', err);
                
                // If the API call fails (e.g., 401 Unauthorized due to expired token)
                setError('Session expired or invalid. Please log in again.');
                localStorage.removeItem('access_token'); 
                
                // Redirect to login after a brief pause to show the error
                setTimeout(() => {
                    navigate('/login');
                }, 1000); 

            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]); // navigate should be a dependency

    if (loading) {
        return <div className="p-8 text-center text-xl text-blue-600">Loading Dashboard...</div>;
    }

    if (error && !user) {
        // Show error message before redirect
        return <div className="p-8 text-center text-red-500 text-lg font-medium">{error}</div>;
    }

    // Since we redirect if !user or !accessToken, this check is mostly for safety
    if (!user) return null; 

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="flex justify-between items-center pb-6 border-b border-gray-300">
                <h1 className="text-3xl font-bold text-gray-900">BragBoard Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md"
                >
                    Logout
                </button>
            </header>
            
            <main className="max-w-4xl mx-auto mt-8">
                {/* User Info Card (Personalized Dashboard View) */}
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg shadow-md" role="alert">
                    <p className="font-bold text-xl">
                        Welcome back, {user.name}! 
                    </p>
                    <p className="mt-1">
                        [cite_start]You are logged in as a **{user.role}** [cite: 95] [cite_start]in the **{user.department}** department[cite: 94].
                    </p>
                </div>

                [cite_start]{/* Placeholder for the main functionality - Shout-Out Feed [cite: 33] */}
                <ShoutOutFeed />

                {/* Placeholder for the Admin Dashboard link (Milestone 4) */}
                [cite_start]{/* User role is 'admin' (ENUM: 'employee', 'admin') [cite: 95] */}
                {user.role === 'admin' && (
                    <div className="mt-8 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                        <p className="font-bold">Admin Privileges Active</p>
                        [cite_start]<p className="text-sm">Access the Admin Dashboard for insights and moderation[cite: 10, 35].</p>
                        {/* A link/button to the Admin Dashboard component would be placed here */}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;