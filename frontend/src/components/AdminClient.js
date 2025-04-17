import React, { useEffect, useState } from "react";
import "../styles/AdminClient.css";

function AdminClient() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    location: "",
    password: "",
  });
  const [editFormData, setEditFormData] = useState(null); // Stocker les données à modifier
  const [addClientMenu, setAddClientMenu] = useState(false);
  const [listClients, setListClients] = useState(true);
  const [editClientId, setEditClientId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    fetch("http://localhost:3001/api/client")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des clients");
        }
        return response.json();
      })
      .then((data) => {
        setClients(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des clients:", error)
      );
  };

  // Gestion des changements pour le formulaire de création
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleCreateClient = (e) => {
    e.preventDefault();
    const clientData = {
      ...formData,
      password: "jobboard", // Mot de passe par défaut
    };
    fetch("http://localhost:3001/api/client/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'ajout du client");
        }
        return response.json();
      })
      .then(() => {
        fetchClients(); // Récupérer la liste des clients après ajout
        setFormData({
          name: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          birthDate: "",
          location: "",
        });
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout du client:", error)
      );
  };

  const handleEditClient = (client) => {
    const formattedBirthDate = client.birthDate
      ? client.birthDate.split("T")[0]
      : "";

    if (editClientId === client.id) {
        setEditClientId(null);
        // setEditFormData(null);
    } else {
      setEditFormData({
        id: client.id,
        name: client.name,
        lastName: client.lastName,
        email: client.email,
        phoneNumber: client.phoneNumber,
        birthDate: formattedBirthDate,
        location: client.location,
      });
        setEditClientId(client.id);
    }
  };

  const toggleAddClientMenu = () => {
    setAddClientMenu(!addClientMenu);
  }

  const toggleListClients = () => {
    setListClients(!listClients);
  } 

  const handleUpdateClient = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/client/${editFormData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du client");
        }
        return response.json();
      })
      .then(() => {
        fetchClients();
        setEditFormData(null);
        setEditClientId(null);
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour du client:", error)
      );
  };

  const handleDeleteClient = (id) => {
    fetch(`http://localhost:3001/api/client/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchClients();
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression du client:", error)
      );
  };

  return (
    <div className = "admin-client-container">
      <h1>Manage Clients</h1>
      <div className = "admin-client-navigation">
        <button onClick={toggleAddClientMenu}>{addClientMenu ? "Close Add Menu" : "Add Client"}</button>
        <button onClick={toggleListClients}>{listClients ? "Close List" : "List Clients"}</button>
      </div>

      {addClientMenu && <div className = "admin-add-client">
      <h2>Add New Client</h2>
      <form onSubmit={handleCreateClient}>
        <input
          name="name"
          value={formData.name}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="name">(Name)</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="lastName">(Surname)</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="email">(Email)</label>
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="phoneNumber">(Phone Number)</label>
        <input
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleCreateChange}
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="location">(Location)</label>
        <div className="admin-client-submit-container"><button type="submit">Save</button></div>
      </form>
      </div>}


      {listClients && <> 
      <h2>List of Clients</h2>
      <div className = "list-clients-container">
        {clients.map((client) => (
          <div className = {`list-clients-background ${editClientId === client.id ? "large" : ""}`} key={client.id}>
            <div>
            <p><strong>{client.name} {client.lastName}</strong></p> <p>{client.email}</p>
            </div>
            <div className = "client-buttons-container">
              <button onClick={() => handleEditClient(client)}>{editClientId === client.id ? "Close" : "Edit"}</button>
              <button onClick={() => handleDeleteClient(client.id)}>
                Delete
              </button>
            </div>
            {editClientId === client.id && (
            <div>
            <form onSubmit={handleUpdateClient}>
              <h2>
                Edit client: {editFormData.name}{" "}{editFormData.lastName}
              </h2>
              <input
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                required
              />
              <label htmlFor="name">(Name)</label>
              <input
                name="lastName"
                value={editFormData.lastName}
                onChange={handleEditChange}
                required
              />
              <label htmlFor="lastName">(Surname)</label>
              <input
                name="email"
                type="email"
                value={editFormData.email}
                onChange={handleEditChange}
                required
              />
              <label htmlFor="email">(Email)</label>
              <input
                name="phoneNumber"
                value={editFormData.phoneNumber}
                onChange={handleEditChange}
                required
              />
              <label htmlFor="phoneNumber">(Phone Number)</label>
              <input
                name="birthDate"
                type="date"
                value={editFormData.birthDate}
                onChange={handleEditChange}
                required
              />
              <label htmlFor="birthDate">(Birth Date)</label>
              <input
                name="location"
                value={editFormData.location}
                onChange={handleEditChange}
                required
              />
              <label htmlFor="location">(City)</label>
              <div className="admin-client-submit-container"><button type="submit">Update</button></div>
          </form>
        </div>
      )}
          </div>
        ))}
      </div>
      </>}  
    </div>
  );
}

export default AdminClient;
