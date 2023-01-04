const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const router = require("./router");

const app = express();

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

// Redirect all requests to the REACT app
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// router.post("/create-user", (req, res) => {
// Vérifiez si l'utilisateur est un administrateur en utilisant la valeur du champ "role"
// if (req.body.role === "administrateur") {
// Enregistrez le compte de l'utilisateur en tant qu'administrateur dans la base de données
//   connection.query(
//     "INSERT INTO user (firstname, password, role) VALUES (?, ?, ?)",
//     [req.body.fisrtname, req.body.password, req.body.role],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.send(err);
//       }
//       res.send("Utilisateur créé avec succès en tant qu administrateur");
//     }
//   );
// } else {
// Enregistrez le compte de l'utilisateur en tant qu'utilisateur normal dans la base de données
//     connection.query(
//       "INSERT INTO user (firstname, password) VALUES (?, ?)",
//       [req.body.fisrtname, req.body.password],
//       (err, results) => {
//         if (err) {
//           console.error(err);
//           return res.send(err);
//         }
//         res.send("Utilisateur créé avec succès");
//       }
//     );
//   }
// });

// router.get("/user", (req, res) => {
// Sélectionnez uniquement les utilisateurs ayant le rôle "administrateur"
//   connection.query(
//     'SELECT * FROM user WHERE role = "administrateur"',
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.send(err);
//       }
//       res.send(results);
//     }
//   );
// });

// router.put("/update-user-role", (req, res) => {
// Vérifiez si l'utilisateur connecté a le rôle d'administrateur
// if (req.user.role === "administrateur") {
// Mise à jour du rôle de l'utilisateur
//     connection.query(
//       "UPDATE user SET role = ? WHERE id = ?",
//       [req.body.role, req.body.id],
//       (err, results) => {
//         if (err) {
//           console.error(err);
//           return res.send(err);
//         }
//         res.send("Rôle de l utilisateur mis à jour avec succès");
//       }
//     );
//   } else {
//     res
//       .status(403)
//       .send(
//         "Vous n avez pas les permissions nécessaires pour mettre à jour le rôle de cet utilisateur"
//       );
//   }
// });

// ready to export
module.exports = app;
