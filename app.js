// Módulos
const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const session = require("express-session");

// Configuración de public, src para todo el proyecto
app.use(express.static("public"));
// app.use(express.static("assets"));
// app.use(express.static("src"));
app.use(express.urlencoded({ extended: false }));

//Rutas
app.set("view engine", "ejs");
app.set("views", "./views/pages");
app.use(
  session({
    secret: "shh, its a secrete",
    resave: false,
    saveUninitialized: false,
  })
);
const mainRoute = require("./src/routes/mainRoute");
const userRoute = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
const storeRoute = require("./src/routes/storeRoute");
const cartRoute = require("./src/routes/cartRoute");

// INDEX
app.use("/", mainRoute);
app.use("/users", userRoute);
app.use("/", productRoute);
app.use("/", storeRoute);
app.use("/", cartRoute);

// CHECKOUT
app.get("*", function (req, res) {
  res.status(404).render("checkout");
});

//Servidor
app.listen(PORT, () => {
  console.log("SERVIDOR CORRIENDO EN EL PUERTO 3000");
});
