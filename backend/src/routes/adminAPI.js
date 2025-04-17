const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db"); // Connexion à la base de données MySQL
const router = express.Router();

// Route pour gérer la connexion des admins
router.post("/SignIn", (req, res) => {
  const { email, password } = req.body;
  try {
    // Vérifier si l'email existe dans la base de données des admins
    const query = "SELECT * FROM admins WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la requête à la base de données (admins):",
          err
        );
        return res
          .status(500)
          .json({ error: "Erreur lors de la requête admin" });
      }

      // Si l'utilisateur n'est pas trouvé dans la table admins
      if (results.length === 0) {
        return res.status(404).json({ error: "Admin non trouvé" });
      }

      const admin = results[0];
      const match = await bcrypt.compare(password, admin.password);

      if (!match) {
        return res
          .status(401)
          .json({ error: "Mot de passe incorrect pour l'admin" });
      }

      // Si tout est correct, retourner le token de l'admin
      return res.json({
        message: "Admin connecté avec succès!",
        token: admin.token,
      });
    });
  } catch (error) {
    console.error("Erreur lors de la connexion au compte:", error);
    res.status(500).json({ error: "Erreur lors de la connexion au compte" });
  }
});

// Middleware pour vérifier le token admin
router.post("/verify", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token non fourni" });
  }

  // Vérifier si le token existe dans la base de données admins
  const query = "SELECT * FROM admins WHERE token = ?";
  db.query(query, [token], (err, results) => {
    if (err || results.length === 0) {
      return res
        .status(403)
        .json({ error: "Token invalide ou admin non trouvé" });
    }

    // Si le token est valide, renvoyer une réponse de succès
    res.json({ message: "Admin authentifié avec succès" });
  });
});



module.exports = router;
