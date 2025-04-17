import React, { useState, useEffect } from "react";
import "../styles/AdminApplication.css";

function AdminApplication() {
  const [applications, setApplications] = useState([]);
  // const [clients, setClients] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [editApplication, setEditApplication] = useState(null);
  const [newApplication, setNewApplication] = useState({
    clientId: -3,
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    advertisementId: "",
    motivation: "",
  });

  const [addApplicationMenu, setAddApplicationMenu] = useState(false);
  const [listApplications, setListApplications] = useState(true);
  const [editApplicationId, setEditApplicationId] = useState(null);

  useEffect(() => {
    // Fetch toutes les applications
    fetch("http://localhost:3001/api/application/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) =>
        console.error("Erreur lors du fetch des candidatures:", err)
      );

    // Fetch les titres des annonces pour le menu déroulant
    fetch("http://localhost:3001/api/advertisement/titles")
      .then((res) => res.json())
      .then((data) => setAdvertisements(data))
      .catch((err) =>
        console.error("Erreur lors du fetch des titres des annonces:", err)
      );
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/application/applications/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setApplications(applications.filter((app) => app.id !== id));
      })
      .catch((err) => console.error("Erreur lors de la suppression:", err));
  };

  const handleSubmit = (e) => {
    fetch("http://localhost:3001/api/application/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        setApplications([...applications, data]);
        setNewApplication({
          name: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          location: "",
          advertisementId: "",
          motivation: "",
        });
      })
      .catch((err) => console.error("Erreur lors de la création:", err));
  };

  const handleEdit = (application) => {
    if (editApplicationId === application.id) {
      setEditApplicationId(null);
      // setEditFormData(null);
    } else {
      setEditApplication(application); // Remplit le formulaire avec les données de l'application sélectionnée pour modification
      setEditApplicationId(application.id);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:3001/api/application/applications/${editApplication.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editApplication),
      }
    )
      .then((res) => res.json())
      .then(() => {
        setApplications(
          applications.map((app) =>
            app.id === editApplication.id ? editApplication : app
          )
        );
        setEditApplication(null);
        setEditApplicationId(null);
      })
      .catch((err) => console.error("Erreur lors de la mise à jour:", err));
  };

  const toggleAddApplicationMenu = () => {
    setAddApplicationMenu(!addApplicationMenu);
  };

  const toggleListApplications = () => {
    setListApplications(!listApplications);
  };

  return (
    <div className="admin-application-container">
      <h1>Manage Applications</h1>

      <div className="admin-application-navigation">
        <button onClick={toggleAddApplicationMenu}>
          {addApplicationMenu ? "Close Add Menu" : "Add Application"}
        </button>
        <button onClick={toggleListApplications}>
          {listApplications ? "Close List" : "List Applications"}
        </button>
      </div>

      {addApplicationMenu && (
        <div className="admin-add-application">
          <h2>Add New Application</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={newApplication.name}
              onChange={(e) =>
                setNewApplication({ ...newApplication, name: e.target.value })
              }
              required
            />
            <label htmlFor="name">(Name)</label>
            <input
              type="text"
              name="lastName"
              value={newApplication.lastName}
              onChange={(e) =>
                setNewApplication({
                  ...newApplication,
                  lastName: e.target.value,
                })
              }
              required
            />
            <label htmlFor="lastName">(LastName)</label>
            <input
              type="email"
              name="email"
              value={newApplication.email}
              onChange={(e) =>
                setNewApplication({ ...newApplication, email: e.target.value })
              }
              required
            />
            <label htmlFor="email">(Email)</label>
            <input
              type="text"
              name="phoneNumber"
              value={newApplication.phoneNumber}
              onChange={(e) =>
                setNewApplication({
                  ...newApplication,
                  phoneNumber: e.target.value,
                })
              }
              required
            />
            <label htmlFor="phoneNumber">(Phone)</label>
            <input
              type="text"
              name="location"
              value={newApplication.location}
              onChange={(e) =>
                setNewApplication({
                  ...newApplication,
                  location: e.target.value,
                })
              }
              required
            />
            <label htmlFor="location">(City)</label>
            <select
              value={newApplication.advertisementId}
              onChange={(e) =>
                setNewApplication({
                  ...newApplication,
                  advertisementId: e.target.value,
                })
              }
            >
              <option value="">Select advertisement</option>
              {advertisements.map((ad, i) => (
                <option key={i} value={ad.id}>
                  {ad.title}
                </option>
              ))}
            </select>
            <label>(Advertisement title)</label>

            <textarea
              value={newApplication.motivation}
              name="motivation"
              onChange={(e) =>
                setNewApplication({
                  ...newApplication,
                  motivation: e.target.value,
                })
              }
              rows="5"
              required
            />
            <label htmlFor="motivation">(Motivation)</label>

            <div className="admin-advertisement-submit-container">
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      )}

      {listApplications && (
        <>
          <h2>List of Applications</h2>
          <div className="list-applications-container">
            {applications.map((application, i) => (
              <div
                className={`list-advertisements-background ${
                  editApplicationId === application.id ? "large" : ""
                }`}
                key={i}
              >
                <div>
                  <p>
                    {application.name} {application.lastName}
                  </p>{" "}
                  <p>{application.adTitle}</p>
                  <p>{application.motivation}</p>
                </div>
                <div className="application-buttons-container">
                  <button onClick={() => handleEdit(application)}>
                    {editApplicationId === application.id ? "Close" : "Edit"}
                  </button>
                  <button onClick={() => handleDelete(application.id)}>
                    Delete
                  </button>
                </div>

                {editApplicationId === application.id && (
                  <div>
                    <h2>Edit Application</h2>
                    <form onSubmit={handleUpdate}>
                      <input
                        type="text"
                        name="name"
                        value={editApplication.name}
                        onChange={(e) =>
                          setEditApplication({
                            ...editApplication,
                            name: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="name">(Name)</label>
                      <input
                        type="text"
                        name="lastName"
                        value={editApplication.lastName}
                        onChange={(e) =>
                          setEditApplication({
                            ...editApplication,
                            lastName: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="lastName">(Surname)</label>
                      <input
                        type="email"
                        name="email"
                        value={editApplication.email}
                        onChange={(e) =>
                          setEditApplication({
                            ...editApplication,
                            email: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="email">(Email)</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={editApplication.phoneNumber}
                        onChange={(e) =>
                          setEditApplication({
                            ...editApplication,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="phoneNumber">(Phone)</label>
                      <input
                        type="text"
                        name="location"
                        value={editApplication.location}
                        onChange={(e) =>
                          setEditApplication({
                            ...editApplication,
                            location: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="location">(City)</label>
                      <textarea
                        value={editApplication.motivation}
                        onChange={(e) =>
                          setEditApplication({
                            ...editApplication,
                            motivation: e.target.value,
                          })
                        }
                      />
                      <label htmlFor="motivation">(Motivation)</label>
                      <div className="admin-application-submit-container">
                        <button type="submit">Update</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminApplication;
