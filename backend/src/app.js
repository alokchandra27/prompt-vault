require("dotenv").config();
const express = require("express");
const ConnectToDB = require("./db/db");
const authRoutes = require("./routes/auth.routes") 
const promptRoutes = require("./routes/prompt.route")
const aiRoutes = require("./routes/aiPrompt.routes")
const exportRoutes = require("./routes/exportPrompts.route")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();
ConnectToDB();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use("/api/auth",authRoutes)
app.use("/api/prompts", promptRoutes)
app.use("/api/ai", aiRoutes);
app.use("/api/export", exportRoutes); ;


module.exports = app;