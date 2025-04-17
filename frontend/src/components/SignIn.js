import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";

function SignInForm({ handleLogInActive }) {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const errorMessage = (message) => {
    if (message === "User not found.") {
      return (
        <p>
          {message} Please{" "}
          <a href="#" onClick={() => handleLogInActive(false)}>
            sign up.
          </a>
        </p>
      );
    } else {
      return <p>{message}</p>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si l'utilisateur est un admin
    fetch("http://localhost:3001/api/admin/SignIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            return handleClientSignIn();
          }
          throw new Error("Erreur lors de la connexion admin");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("userToken", data.token);
          console.log("Admin connecté avec succès:", data);

          // Rediriger l'utilisateur vers la page Admin.js après la connexion réussie
          navigate("/admin");
        } else {
          console.error("Erreur : Aucune donnée ou token n'a été renvoyé");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
      });
  };

  // Fonction pour gérer la connexion client si l'admin n'est pas trouvé
  const handleClientSignIn = () => {
    fetch("http://localhost:3001/api/client/SignIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error("Erreur lors de la connexion client");
        // }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("userToken", data.token);
          navigate("/");
        } else {
          console.error("Erreur :", data.error);
          if (data.error === "Utilisateur non trouvé") {
            setError("User not found.");
          } else {
            setError("Something went wrong. Please try again later.");
          }
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion client:", error);
      });
  };

  return (
    <div className="signin-form">
      <form className={"loginForm"} onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <input
          type="email"
          name="email"
          value={signInData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">(Email)</label>
        <input
          type="password"
          name="password"
          value={signInData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">(Password)</label>
        <div className="login-submit-container">
          <button type="submit">Log In</button>
        </div>
        {error && errorMessage(error)}
      </form>
    </div>
  );
}

export default SignInForm;
