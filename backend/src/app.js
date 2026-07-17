require("dotenv").config();
const express = require("express");
const ConnectToDB = require("./db/db");
const authRoutes = require("./routes/auth.routes") 

const app = express();
ConnectToDB();
app.use(express.json())

app.use("/api/auth",authRoutes)


module.exports = app;