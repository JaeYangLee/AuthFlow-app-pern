const authFlowRoutes = require("./routes/authFlowRoutes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", authFlowRoutes);

module.exports = app;
