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
// (Express ko batane ke liye ki yeh proxy ke peeche chal raha hai)
app.set("trust proxy", 1)

ConnectToDB();
app.use(express.json())
app.use(cookieParser())


const allowedOrigins = [
  "http://localhost:5173",
  "https://prompt-vault-xi-umber.vercel.app" 
];

app.use(cors({
  origin: function (origin, callback) {
    // Postman ya server-to-server requests ke liye jinka origin nahi hota
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation: This origin is not allowed.'), false);
    }
    return callback(null, true);
  },
  credentials: true,
}))

app.use("/api/auth",authRoutes)
app.use("/api/prompts", promptRoutes)
app.use("/api/ai", aiRoutes);
app.use("/api/export", exportRoutes);


module.exports = app;