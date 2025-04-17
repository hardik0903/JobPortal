import React, { useEffect, useState } from "react";
import "../styles/AdminCompany.css";

function AdminCompany() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [editFormData, setEditFormData] = useState(null);
  const [addCompanyMenu, setAddCompanyMenu] = useState(false);
  const [listCompanies, setListCompanies] = useState(true);
  const [editCompanyId, setEditCompanyId] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    fetch("http://localhost:3001/api/company")
      .then((response) => response.json())
      .then((data) => setCompanies(data))
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

  const handleCreateCompany = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchCompanies();
        setFormData({
          name: "",
          location: "",
        });
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout de l'entreprise:", error)
      );
  };

  const handleEditCompany = (company) => {
    if (editCompanyId === company.id) {
      setEditCompanyId(null);
      // setEditFormData(null);
    } else {
      setEditFormData({
        id: company.id,
        name: company.name,
        location: company.location,
      });
      setEditCompanyId(company.id);
    }
  };

  const toggleAddCompanyMenu = () => {
    setAddCompanyMenu(!addCompanyMenu);
  }

  const toggleListCompanies = () => {
    setListCompanies(!listCompanies);
  }  

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/company/${editFormData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchCompanies();
        setEditFormData(null);
        setEditCompanyId(null);
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour de l'entreprise:", error)
      );
  };

  const handleDeleteCompany = (id) => {
    fetch(`http://localhost:3001/api/advertisement/byCompany/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        return fetch(`http://localhost:3001/api/company/${id}`, {
          method: "DELETE",
        });
      })
      .then(() => fetchCompanies())
      .catch((error) =>
        console.error(
          "Erreur lors de la suppression des annonces ou de l'entreprise:",
          error
        )
      );
  };

  return (
    <div className = "admin-company-container">
      <h1>Manage Companies</h1>
      <div className = "admin-company-navigation">
        <button onClick={toggleAddCompanyMenu}>{addCompanyMenu ? "Close Add Menu" : "Add Company"}</button>
        <button onClick={toggleListCompanies}>{listCompanies ? "Close List" : "List Companies"}</button>
      </div>
      {addCompanyMenu && <div className = "admin-add-company">
        <h2>Add New Company</h2>
      <form onSubmit={handleCreateCompany}>
        <input
          name="name"
          value={formData.name}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="name">(Name)</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleCreateChange}
          required
        />
        <label htmlFor="location">(Location)</label>
        <div className="admin-company-submit-container"><button type="submit">Save</button></div>
      </form>
      </div>}

      {listCompanies && <>
        <h2>List of Companies</h2>
        <div className = "list-companies-container">
        {companies.map((company) => (
          <div className = {`list-companies-background ${editCompanyId === company.id ? "large" : ""}`} key={company.id}>
            <div>
              <p><strong>{company.name}</strong></p><p>{company.location}</p>
            </div>
            <div className = "company-buttons-container">
            <button onClick={() => handleEditCompany(company)}>{editCompanyId === company.id ? "Close" : "Edit"}</button>
            <button onClick={() => handleDeleteCompany(company.id)}>
              Delete
            </button>
            </div>
            {editCompanyId === company.id && (
            <div>
              <form onSubmit={handleUpdateCompany}>
              <h2>Edit company: {editFormData.name}</h2>
                <input
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="name">(Name)</label>
                <input
                  name="location"
                  value={editFormData.location}
                  onChange={handleEditChange}
                  required
                />
                <label htmlFor="location">(Location)</label>
                <div className="admin-company-submit-container"><button type="submit">Update</button></div>
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

export default AdminCompany;
