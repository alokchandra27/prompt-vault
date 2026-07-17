const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

//   email: {
//     type: String,
//     unique: true,
//     sparse: true, // optional
//   },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const userModel = mongoose.model("user",userSchema)

module.exports = userModel