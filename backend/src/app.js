require("dotenv").config();
const express = require("express");
const ConnectToDB = require("./db/db");
const authRoutes = require("./routes/auth.routes") 
const promptRoutes = require("./routes/prompt.route")
const cookieParser = require("cookie-parser")

const app = express();
ConnectToDB();
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/prompts", promptRoutes)


module.exports = app;