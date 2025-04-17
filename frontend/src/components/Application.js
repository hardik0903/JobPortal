import React, { useState, useEffect } from "react";
import "../styles/Application.css";

function Application({ userData, adID }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    motivation: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        location: userData.location || "",
        motivation: "",
      });
    }

    if (userData.id && adID) {
      fetch("http://localhost:3001/api/application/check-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.id,
          advertisementId: adID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.alreadyApplied) {
            setAlreadyApplied(true);
          }
        })
        .catch((error) => {
          console.error("Error checking application:", error);
        });
    }
  }, [userData, adID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!localStorage.getItem("userToken")) {
      userData.id = -1;
    }
    if (
      localStorage.getItem("userToken") === "7_DErLsNtMgUCSE_FG0x66dWqWPsP5SJ"
    ) {
      userData.id = -2;
    }
    if (!formData.motivation) {
      console.error("Motivation is missing.");
      return;
    }

    const applicationData = {
      userId: userData.id,
      advertisementId: adID,
      motivation: formData.motivation,
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      location: formData.location,
    };
    console.log(applicationData);
    fetch("http://localhost:3001/api/application/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // La candidature a été soumise, maintenant on envoie l'email
          fetch("http://localhost:3001/api/application/sendApplication", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(applicationData),
          })
            .then((response) => response.json())
            .then((emailData) => {
              if (emailData.success) {
                console.log("Email envoyé avec succès !");
              } else {
                console.error(
                  "Erreur lors de l'envoi de l'email :",
                  emailData.error
                );
              }
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la requête d'envoi de l'email :",
                error
              );
            });
          setSubmitted(true);
        }
      })
      .catch((error) => {
        console.error("Error submitting application:", error);
      });
  };

  if (submitted) {
    return <h3>Thank you for your application!</h3>;
  }

  return (
    <div className="application">
      <h2>Application</h2>
      {alreadyApplied && (
        <p
          style={{
            color: "rgb(208, 8, 8)",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          <i>You have already applied for this offer.</i>
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name">(Name)</label>
        </div>
        <div>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="lastName">(Surname)</label>
        </div>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">(Email)</label>
        </div>
        <div>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <label htmlFor="phoneNumber">(Phone)</label>
        </div>
        <div>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <label htmlFor="location">(City)</label>
        </div>
        <div>
          <label htmlFor="motivation">
            Please describe your motivation, tell us about your skills and
            background:
          </label>
          <textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>
        <div className="submit-container">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default Application;
