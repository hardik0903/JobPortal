import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SignUpForm from "../components/SignUp";
import SignInForm from "../components/SignIn";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import icon from "../resources/login-icon.png";
import car from "../resources/car.png";

function Login() {
  const location = useLocation();
  const [logInActive, setLogInActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/");
    }
    const mode = location.state?.mode;
    if (mode === "login") {
      setLogInActive(true);
    } else if (mode === "signup") {
      setLogInActive(false);
    }
  }, [location, navigate]);

  const handleLogInActive = (value) => {
    setLogInActive(value);
  };

  const handleHomeReturn = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-redline"></div>
      <img src={icon} alt="icon" className="login-icon" />
      <div className="buttons-container">
        <button onClick={() => handleLogInActive(true)}>Log In</button>
        <button onClick={() => handleLogInActive(false)}>Sign Up</button>
        <button onClick={handleHomeReturn}>Home</button>
      </div>
      <div className={`component-container ${logInActive ? 'active' : ''}`}>
        {logInActive && <SignInForm handleLogInActive={handleLogInActive} />}
      </div>
      <div className={`component-container ${!logInActive ? 'active' : ''}`}>
        {!logInActive && <SignUpForm handleLogInActive={handleLogInActive} />}
      </div>
      <img src={car} alt="car" className="car-icon"/>
    </div>
  );
}

export default Login;
