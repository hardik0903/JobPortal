import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../resources/Icon.png";
import "../styles/Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setUserData({ name: "inconnu" });
    } else if (token === "7_DErLsNtMgUCSE_FG0x66dWqWPsP5SJ") {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUserData({ name: "Admin" });
    } else {
      fetch("http://localhost:3001/api/client/Client", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setUserData(data);
          }
        })
        .catch((error) => console.error("Erreur:", error));
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login", { state: { mode: "login" } });
  };

  const handleSignUp = () => {
    navigate("/login", { state: { mode: "signup" } });
  };

  const handleMyCabinet = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/client");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header>
      <div className="red-line"></div>
      <div className="logo_container">
        <img onClick={handleHome} src={Logo} alt="Logo"></img>
      </div>
      <nav
        className={`navigation-buttons ${
          isLoggedIn ? "logged-in" : "logged-out"
        }`}
      >
        {isLoggedIn ? (
          <>
            <span>Hello, {userData.name}!</span>
            <div>
              {location.pathname === "/" && (
                <button onClick={handleMyCabinet}>My Cabinet</button>
              )}
              {location.pathname === "/client" && (
                <button onClick={handleHome}>Home</button>
              )}
              {location.pathname === "/admin" && (
                <>
                  <button onClick={handleHome}>Home</button>
                </>
              )}
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <button onClick={handleLogin}>Log In</button>
            <button onClick={handleSignUp}>Sign Up</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
