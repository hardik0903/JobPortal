const express = require("express");
const db = require("../db"); // Connexion à la base de données
const router = express.Router();

// Route pour récupérer tous les clients
router.get("/", (req, res) => {
  db.query("SELECT * FROM companies", (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des companies" });
    }
    res.json(results);
  });
});

// Ajouter une nouvelle entreprise
router.post("/", (req, res) => {
  const { name, location } = req.body;
  const query = "INSERT INTO companies (name, location) VALUES (?, ?)";
  db.query(query, [name, location], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de l'ajout de l'entreprise" });
    }
    res.json({ message: "Entreprise ajoutée avec succès!" });
  });
});

// Mettre à jour une entreprise par ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;
  const query = "UPDATE companies SET name = ?, location = ? WHERE id = ?";
  db.query(query, [name, location, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour de l'entreprise" });
    }
    res.json({ message: "Entreprise mise à jour avec succès!" });
  });
});

// Supprimer une entreprise par ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM companies WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression de l'entreprise" });
    }
    res.json({ message: "Entreprise supprimée avec succès!" });
  });
});

module.exports = router;
