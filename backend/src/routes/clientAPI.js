const express = require("express");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const db = require("../db");
const router = express.Router();

// ==============================
// SignIn
// ==============================
router.post("/SignIn", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM clients WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Erreur DB (SignIn):", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    return res.json({ message: "Connecté avec succès", token: user.token });
  });
});

// ==============================
// SignUp
// ==============================
router.post("/SignUp", (req, res) => {
  const { name, lastName, email, phoneNumber, birthDate, location, password } = req.body;
  const checkQuery = "SELECT * FROM clients WHERE email = ?";

  db.query(checkQuery, [email], async (err, results) => {
    if (err) {
      console.error("Erreur email check:", err);
      return res.status(500).json({ error: "Erreur lors de la vérification de l'email" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = uid2(32);

      const insertQuery = `
        INSERT INTO clients (name, lastName, email, phoneNumber, birthDate, location, password, token)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        insertQuery,
        [name, lastName, email, phoneNumber, birthDate, location, hashedPassword, token],
        (err) => {
          if (err) {
            console.error("Erreur insertion:", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion" });
          }

          return res.json({ message: "Compte créé avec succès", token });
        }
      );
    } catch (error) {
      console.error("Erreur création compte:", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  });
});

// ==============================
// Get All Clients
// ==============================
router.get("/", (req, res) => {
  db.query("SELECT * FROM clients", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la récupération des clients" });
    }
    return res.json(results);
  });
});

// ==============================
// Update Client By ID
// ==============================
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, phoneNumber, birthDate, location } = req.body;

  let query = "UPDATE clients SET ";
  const updates = [];
  const values = [];

  if (name) updates.push("name = ?"), values.push(name);
  if (lastName) updates.push("lastName = ?"), values.push(lastName);
  if (email) updates.push("email = ?"), values.push(email);
  if (phoneNumber) updates.push("phoneNumber = ?"), values.push(phoneNumber);
  if (birthDate) updates.push("birthDate = ?"), values.push(birthDate);
  if (location) updates.push("location = ?"), values.push(location);

  if (updates.length === 0) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  query += updates.join(", ") + " WHERE id = ?";
  values.push(id);

  db.query(query, values, (err) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }

    return res.json({ success: true, message: "Client mis à jour avec succès" });
  });
});

// ==============================
// Delete Client
// ==============================
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM clients WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la suppression du client" });
    }
    return res.json({ message: "Client supprimé avec succès" });
  });
});

// ==============================
// Auth Middleware
// ==============================
const authentificateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  db.query("SELECT * FROM clients WHERE token = ?", [token], (err, results) => {
    if (err || results.length === 0) {
      return res.status(403).json({ error: "Token invalide" });
    }

    req.client = results[0];
    next();
  });
};

// ==============================
// Get Own Profile
// ==============================
router.get("/Client", authentificateToken, (req, res) => {
  return res.json(req.client);
});

// ==============================
// Update Own Profile
// ==============================
router.put("/Update/Update", authentificateToken, (req, res) => {
  const { name, lastName, email, phoneNumber, location } = req.body;

  let query = "UPDATE clients SET ";
  const updates = [];
  const values = [];

  if (name) updates.push("name = ?"), values.push(name);
  if (lastName) updates.push("lastName = ?"), values.push(lastName);
  if (email) updates.push("email = ?"), values.push(email);
  if (phoneNumber) updates.push("phoneNumber = ?"), values.push(phoneNumber);
  if (location) updates.push("location = ?"), values.push(location);

  if (updates.length === 0) {
    return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
  }

  query += updates.join(", ") + " WHERE id = ?";
  values.push(req.client.id);

  db.query(query, values, (err) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }

    return res.json({ success: true, message: "Profil mis à jour avec succès" });
  });
});

// ==============================
// Change Password
// ==============================
router.put("/changePassword/changePassword", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const { currentPassword, newPassword } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  db.query("SELECT * FROM clients WHERE token = ?", [token], (err, results) => {
    if (err || results.length === 0) {
      return res.status(403).json({ error: "Utilisateur non trouvé" });
    }

    const user = results[0];
    bcrypt.compare(currentPassword, user.password, (err, match) => {
      if (!match) {
        return res.status(401).json({ error: "Mot de passe actuel incorrect" });
      }

      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
      db.query("UPDATE clients SET password = ? WHERE id = ?", [hashedNewPassword, user.id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Erreur mise à jour mot de passe" });
        }

        return res.json({ success: true, message: "Mot de passe mis à jour avec succès" });
      });
    });
  });
});

// ==============================
// Get All Emails
// ==============================
router.get("/emails", (req, res) => {
  db.query("SELECT id, email FROM clients", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erreur récupération des emails" });
    }

    return res.json(results);
  });
});

module.exports = router;
