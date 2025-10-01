import React from "react";

function Navbar({ onShowRegister, onShowLogin }) {
  return (
    <div className="bg-black h-[50px] flex items-center px-6 w-full">
      <nav className="flex space-x-6 text-white font-medium text-xl ">
        <button onClick={onShowRegister} className="hover:text-gray-300 hover:border rounded">Register</button>
        <button onClick={onShowLogin} className="hover:text-gray-300 hover:border rounded">Login</button>
      </nav>
    </div>
  );
}

export default Navbar;