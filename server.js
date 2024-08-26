const express = require("express");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const md5 = require("md5");
const app = express();

// Configurazione della sessione
app.use(
  session({
    secret: "Vins0404!!", // Cambia questa chiave con una tua scelta
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Imposta su 'true' se usi HTTPS
  })
);

// Middleware per proteggere la dashboard
function checkAuth(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/");
  }
}

// Servire la cartella public
app.use(express.static(path.join(__dirname, "public")));

// Servire i file dalla cartella upload_img
app.use("/upload_img", express.static(path.join(__dirname, "upload_img")));

// Rotta per ottenere la lista delle immagini
app.get("/images", (req, res) => {
  const directoryPath = path.join(__dirname, "upload_img");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan files");
    }

    const images = files.filter((file) => {
      return (
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png") ||
        file.endsWith(".gif")
      );
    });

    res.json(images);
  });
});

// Endpoint per il login
app.post("/login", express.urlencoded({ extended: true }), (req, res) => {
  const password = req.body.password;
  const correctPasswordHash = "3b7671cd7b7e5083f0216314ee68b113"; // Sostituisci con l'hash MD5 della tua password

  const userPasswordHash = md5(password);

  if (userPasswordHash === correctPasswordHash) {
    req.session.isAuthenticated = true;
    res.status(200).send("OK");
  } else {
    res.status(401).send("Incorrect password");
  }
});

// Protegge l'accesso a dashboard.html
app.get("/dashboard.html", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Rotta di logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.redirect("/");
  });
});

// Avvia il server
app.listen(3000, () => {
  console.log("Server in ascolto su http://localhost:3000");
});
