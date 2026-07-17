const express = require("express")
const route = express.Router()
const {userRegister, userLogin} = require("../controllers/auth.controller")

route.post("/register" , userRegister)
route.post("/login" , userLogin)


module.exports = route