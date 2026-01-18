require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const consign = require("consign");
const db = require("./config/db.js");
const axios = require("axios")

app.db = db;
app.axios = axios;

consign()
    .include("config/middlewares.js")
    .then("api")
    .then("config/routes.js")
    .into(app);

app.listen(port, () => {
  console.log("Servidor rodando na porta... " + port);
});
