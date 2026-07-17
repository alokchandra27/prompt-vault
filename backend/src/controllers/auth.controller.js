const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userRegister(req, res) {
  const { name, username, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ username });

  if (isUserAlreadyExist) {
    return res.status(409).json({ message: "Username Already Exists" });
  }

  const user = await userModel.create({
    name,
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registered Successfully",
    user,
    token,
  });
}

async function userLogin(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(409).json({
      message: "Invalid Username",
    });
  }

  const IsPasswordValid = await bcrypt.compare(password, user.password);

  if (!IsPasswordValid) {
    return res.status(409).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Logged In Successfully",
    user,
  });
}

module.exports = {
  userRegister,
  userLogin,
};
