import React, { useEffect, useState } from "react";
import "../styles/ClientApplicationList.css";

function ClientApplicationList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      fetch("http://localhost:3001/api/application/clientApplications", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setApplications(data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des candidatures :",
            error
          );
        });
    }
  }, []);

  return (
    <div className="client-application">
      <h1>My Applications</h1>
      {applications.length === 0 && (
        <p style={{ textAlign: "center" }}>
          You don't have any applications yet.
        </p>
      )}
      <ul>
        {applications.map((application, i) => (
          <li key={i}>
            <h2>{application.title}</h2>
            <p>Entreprise: {application.companyName}</p>
            <p>Localisation: {application.location}</p>
            <p>Motivation: {application.motivation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientApplicationList;
