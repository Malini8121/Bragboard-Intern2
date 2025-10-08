import React from 'react';
import { Link } from 'react-router-dom';

// IMPORTANT: We should not rely on a local state/prop for isLoggedIn.
// The actual logic (Week 2, Step 3) will be to check if a JWT token exists.
// For now, we'll use a variable to simulate the two states.

const Navbar = () => {
  // --- Start: Logic for conditional display (MUST be replaced later) ---
  // If a user has a JWT token, they are logged in. For now, let's use a flag.
  // Set this to 'false' to see the Register/Login buttons for testing.
  const isLoggedIn = false; 
  // --- End: Logic for conditional display ---

  return (
    <nav className="bg-blue-600 p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* App Title/Home Link */}
        <Link to="/" className="text-white text-2xl font-bold">
          BragBoard
        </Link>

        {/* --- Dynamic Links based on Login Status --- */}
        {isLoggedIn ? (
          // 1. If LOGGED IN: Show User Info and Logout
          <div className="flex items-center space-x-4">
            {/* Placeholder for User Info (Update this in Week 2, Step 3) */}
            <span className="text-white text-lg">Hello, User!</span>

            {/* Logout Button */}
            <button
              className="bg-white text-blue-600 px-3 py-1 rounded-md font-medium hover:bg-gray-200 transition"
              // When implementing real auth: onClick should remove the JWT token
              onClick={() => console.log('Logout clicked')} 
            >
              Logout
            </button>
          </div>
        ) : (
          // 2. If LOGGED OUT: Show Register and Login buttons
          <div className="flex space-x-4">
            
            {/* Register Button/Link */}
            <Link 
              to="/register" 
              className="text-white font-medium hover:text-gray-200 transition"
            >
              Register
            </Link>

            {/* Login Button/Link */}
            <Link 
              to="/login" 
              className="bg-white text-blue-600 px-3 py-1 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;