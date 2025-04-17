// src/pages/SignUp.js
import React, { useState } from "react";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUpForm({ handleLogInActive }) {
  const [signUpData, setSignUpData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    birthDate: "",
    location: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuccess = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch("http://localhost:3001/api/client/SignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
    })
      .then(async (res) => {
        const payload = await res.json();
        console.log("HTTP", res.status, payload);
        if (!res.ok) {
          // throw to jump into catch
          throw new Error(payload.error || `HTTP ${res.status}`);
        }
        return payload;
      })
      .then((data) => {
        // successful signup
        localStorage.setItem("userToken", data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error("SignUp failed:", err);
        // if it's a known backend message, show it; otherwise, show generic
        const msg = err.message.includes("Cet email")
          ? "Email is already used."
          : err.message;
        setError(msg);
      });
  };
  

  const renderError = () => {
    if (!error) return null;
    if (error === "Email is already used.") {
      return (
        <p className="error">
          {error} Please{" "}
          <a href="#" onClick={() => handleLogInActive(true)}>
            log in.
          </a>
        </p>
      );
    }
    return <p className="error">{error}</p>;
  };

  return (
    <div className="signup-form">
      <form className="signUpForm" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={signUpData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Surname</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={signUpData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={signUpData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={signUpData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone</label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            value={signUpData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">Date of Birth</label>
          <input
            id="birthDate"
            type="date"
            name="birthDate"
            value={signUpData.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">City</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="e.g. Mumbai"
            value={signUpData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-submit-container">
          <button type="submit">Sign Up</button>
        </div>

        {renderError()}
      </form>
    </div>
  );
}

export default SignUpForm;
