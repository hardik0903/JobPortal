const express = require("express");
const db = require("../db");
const router = express.Router();

// 1. Get all advertisements with company name
router.get("/", (req, res) => {
  const query = `
    SELECT advertisements.*, companies.name AS companyName
    FROM advertisements
    JOIN companies ON advertisements.company = companies.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des annonces:", err);
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
    res.json(results);
  });
});

// 2. Add a new advertisement
router.post("/", (req, res) => {
  const { title, description, company, location, contract, salary, postDate } = req.body;

  if (!title || !description || !company || !location || !contract || !salary || !postDate) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const query = `
    INSERT INTO advertisements (title, description, company, location, contract, salary, postDate)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [title, description, company, location, contract, salary, postDate], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'ajout de l'annonce:", err);
      return res.status(500).json({ error: "Erreur lors de l'ajout de l'annonce" });
    }
    res.status(201).json({ message: "Annonce ajoutée avec succès!" });
  });
});

// 3. Update an advertisement by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, company, location, contract, salary, postDate } = req.body;

  if (!title || !description || !company || !location || !contract || !salary || !postDate) {
    return res.status(400).json({ error: "Tous les champs sont requis pour la mise à jour" });
  }

  const query = `
    UPDATE advertisements 
    SET title = ?, description = ?, company = ?, location = ?, contract = ?, salary = ?, postDate = ?
    WHERE id = ?
  `;
  db.query(query, [title, description, company, location, contract, salary, postDate, id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de l'annonce:", err);
      return res.status(500).json({ error: "Erreur lors de la mise à jour de l'annonce" });
    }
    res.json({ message: "Annonce mise à jour avec succès!" });
  });
});

// 4. Delete an advertisement by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM advertisements WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'annonce:", err);
      return res.status(500).json({ error: "Erreur lors de la suppression de l'annonce" });
    }
    res.json({ message: "Annonce supprimée avec succès!" });
  });
});

// 5. Delete all advertisements by company ID
router.delete("/byCompany/:companyId", (req, res) => {
  const { companyId } = req.params;
  const query = "DELETE FROM advertisements WHERE company = ?";

  db.query(query, [companyId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression des annonces par entreprise:", err);
      return res.status(500).json({ error: "Erreur lors de la suppression des annonces" });
    }
    res.json({ message: "Toutes les annonces de cette entreprise ont été supprimées" });
  });
});

// 6. Get advertisement titles
router.get("/titles", (req, res) => {
  const query = "SELECT id, title FROM advertisements";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des titres:", err);
      return res.status(500).json({ error: "Erreur lors de la récupération des titres" });
    }
    res.json(results);
  });
});

module.exports = router;
