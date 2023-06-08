const express = require("express");
const controller = require("./controller/controller")
const authRoutes = require("./routes/auth");
// const protectedRoutes = require("./routes/protected");

const app = express();
app.use(express.json());

app.use(authRoutes);
/*
app.use(protectedRoutes);
*/

module.exports = app;
