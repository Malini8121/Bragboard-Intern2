import React, { useState } from "react";
import Navbar from "./navbar";
import Register from "./register";
import Login from "./login";

function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
};

const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
};

return (
    <div>
      <Navbar onShowRegister={handleShowRegister} onShowLogin={handleShowLogin} />

      <div className="p-16">
        {showRegister && <Register />}
        {showLogin && <Login />}
      </div>
    </div>
  );
}

export default Home;