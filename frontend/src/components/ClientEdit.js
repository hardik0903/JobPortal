import React, { useState, useEffect } from "react";
import "../styles/ClientEdit.css";

function ClientEdit() {
  const [editData, setEditData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken"); // Suppose qu'on récupère le token stocké
    if (token) {
      // Fetch pour récupérer les données actuelles du client
      fetch("http://localhost:3001/api/client/Client", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setEditData(data);
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération des données du client:",
            error
          )
        );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas");
      return;
    }
    const token = localStorage.getItem("userToken");

    // Appel à l'API pour changer le mot de passe
    fetch("http://localhost:3001/api/client/changePassword/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Mot de passe changé avec succès");
        } else {
          alert(`Erreur : ${data.error}`);
        }
      })
      .catch((error) =>
        console.error("Erreur lors du changement de mot de passe :", error)
      );
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    fetch("http://localhost:3001/api/client/Update/Update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Mise à jour réussie !");
        } else {
          console.error(
            "Erreur lors de la mise à jour des données :",
            data.error
          );
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour du profil:", error)
      );
  };

  return (
    <div className={"client-edit"}>
      <form className="update-data" onSubmit={handleEdit}>
        <h2>Personal data</h2>
        <input
          type="text"
          name="name"
          value={editData.name}
          onChange={handleChange}
        />
        <label htmlFor="name">(Name)</label>
        <input
          type="text"
          name="lastName"
          value={editData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">(Surname)</label>
        <input
          type="email"
          name="email"
          value={editData.email}
          onChange={handleChange}
        />
        <label htmlFor="email">(Email)</label>
        <input
          type="tel"
          name="phoneNumber"
          value={editData.phoneNumber}
          onChange={handleChange}
        />
        <label htmlFor="phoneNumber">(Phone)</label>
        <input
          type="text"
          name="location"
          value={editData.location}
          onChange={handleChange}
        />
        <label htmlFor="location">(City)</label>
        <div className="clientedit-submit-container">
          <button type="submit">Save Changes</button>
        </div>
      </form>

      <form className="change-password" onSubmit={handleChangePassword}>
        <h2>Change Password</h2>
        <input
          type="password"
          name="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <label htmlFor="currentPassword">(Current Password)</label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />{" "}
        <label htmlFor="newPassword">(New Password)</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">(Confirm Password)</label>
        <div className="clientedit-submit-container">
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
}

export default ClientEdit;
