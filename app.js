const express = require("express");
const routes = require("./routes/routes");

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(routes);

module.exports = app;
