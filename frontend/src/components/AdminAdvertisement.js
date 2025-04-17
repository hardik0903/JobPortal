import React, { useEffect, useState } from "react";
import "../styles/AdminAdvertisement.css";

function AdminAdvertisement() {
  const [advertisements, setAdvertisements] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    contract: "",
    salary: "",
    postDate: "",
  });
  const [editFormData, setEditFormData] = useState(null);

  const [addAdvertisementMenu, setAddAdvertisementMenu] = useState(false);
  const [listAdvertisements, setListAdvertisements] = useState(true);
  const [editAdvertisementId, setEditAdvertisementId] = useState(null);

  useEffect(() => {
    fetchAdvertisements();
    fetchCompanies();
  }, []);

  const fetchAdvertisements = () => {
    fetch("http://localhost:3001/api/advertisement")
      .then((response) => response.json())
      .then((data) => {
        setAdvertisements(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des annonces:", error)
      );
  };

  const fetchCompanies = () => {
    fetch("http://localhost:3001/api/company")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des entreprises:", error)
      );
  };

  // Gestion des changements pour le formulaire de création
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion des changements pour le formulaire de modification
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleCreateAdvertisement = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/advertisement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchAdvertisements();
        setFormData({
          title: "",
          description: "",
          company: "",
          location: "",
          contract: "",
          salary: "",
          postDate: "",
        });
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout de l'annonce:", error)
      );
  };

  const handleEditAdvertisement = (advertisement) => {
    const formattedPostDate = advertisement.postDate
      ? advertisement.postDate.split("T")[0]
      : "";

    if (editAdvertisementId === advertisement.id) {
        setEditAdvertisementId(null);
        // setEditFormData(null);
    } else {
      setEditFormData({
        id: advertisement.id,
        title: advertisement.title,
        description: advertisement.description,
        company: advertisement.company,
        location: advertisement.location,
        contract: advertisement.contract,
        salary: advertisement.salary,
        postDate: formattedPostDate,
      });
      setEditAdvertisementId(advertisement.id);
    }  
  };

  const toggleAddAdvertisementMenu = () => {
    setAddAdvertisementMenu(!addAdvertisementMenu);
  }

  const toggleListAdvertisements = () => {
    setListAdvertisements(!listAdvertisements);
  } 

  const handleUpdateAdvertisement = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/advertisement/${editFormData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchAdvertisements(); // Récupérer la liste des annonces après mise à jour
        setEditFormData(null); // Réinitialiser le formulaire de modification
        setEditAdvertisementId(null);
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour de l'annonce:", error)
      );
  };

  const handleDeleteAdvertisement = (id) => {
    fetch(`http://localhost:3001/api/advertisement/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchAdvertisements()) // Récupérer la liste des annonces après suppression
      .catch((error) =>
        console.error("Erreur lors de la suppression de l'annonce:", error)
      );
  };

  return (
    <div className = "admin-advertisement-container">
      <h1>Manage Advertisements</h1>
      <div className = "admin-advertisement-navigation">
        <button onClick={toggleAddAdvertisementMenu}>{addAdvertisementMenu ? "Close Add Menu" : "Add Advertisement"}</button>
        <button onClick={toggleListAdvertisements}>{listAdvertisements ? "Close List" : "List Advertisements"}</button>
      </div>

      {addAdvertisementMenu && <div className = "admin-add-advertisement">
      <h2>Add New Advertisement</h2>
      <form onSubmit={handleCreateAdvertisement}>
        <input
          name="title"
          value={formData.title}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="title">(Title)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="description">(Description)</label>
        <select
          name="company"
          value={formData.company}
          onChange={handleCreateChange}
          required
        >
          <option value="">Choose a company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <label htmlFor="company">(Company)</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="location">(City)</label>
        <input
          name="contract"
          value={formData.contract}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="contract">(Contract Type)</label>
        <input
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="salary">(Salary)</label>
        <input
          name="postDate"
          type="date"
          value={formData.postDate}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="postDate">(Post Date)</label>
        <div className="admin-advertisement-submit-container"><button type="submit">Add</button></div>
      </form>
      </div>}

      {listAdvertisements && <>    
      <h2>List of Advertisements</h2>
      <div className = "list-advertisements-container">
        {advertisements.map((ad) => (
          <div className = {`list-advertisements-background ${editAdvertisementId === ad.id ? "large" : ""}`} key={ad.id}>
            <div>
              <p><strong>{ad.title}</strong></p> <p>{ad.companyName}</p> <p>{ad.location}</p>
            </div>
            <div className = "advertisement-buttons-container">
            <button onClick={() => handleEditAdvertisement(ad)}>
              {editAdvertisementId === ad.id ? "Close" : "Edit"}
            </button>
            <button onClick={() => handleDeleteAdvertisement(ad.id)}>
              Delete
            </button>
            </div>
            {editAdvertisementId === ad.id && (
            <div>
              <h2>Edit Advertisement: {editFormData.title}</h2>
              <form onSubmit={handleUpdateAdvertisement}>
                <input
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="title">(Title)</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="description">(Description)</label>
                <select
                  name="company"
                  value={editFormData.company}
                  onChange={handleEditChange}
                  required
                >
                <option value="">Choose company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="company">(Company)</label>
                <input
                  name="location"
                  value={editFormData.location}
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="location">(City)</label>
                <input
                  name="contract"
                  value={editFormData.contract}
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="contract">(Contract Type)</label>
                <input
                  name="salary"
                  type="number"
                  value={editFormData.salary}
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="salary">(Salary)</label>
                <input
                  name="postDate"
                  type="date"
                  value={editFormData.postDate}
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="postDate">(Post Date)</label>
                <div className="admin-advertisement-submit-container"><button type="submit">Update</button></div>
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

export default AdminAdvertisement;
