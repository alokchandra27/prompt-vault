const express = require("express")
const route = express.Router()
const {userRegister, userLogin , getUser, userLogout, updateUser} = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/authMiddleware")

route.post("/register" , userRegister)
route.post("/login" , userLogin)
route.get("/me" ,authMiddleware, getUser)
route.post("/logout" ,authMiddleware, userLogout)
route.patch("/update-name" ,authMiddleware, updateUser)

module.exports = route