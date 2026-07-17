const mongoose = require("mongoose");

async function ConnectToDB() {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected TO DB✅");
    })
    .catch((err) => {
      console.log("Error Connecting to DB:", err);
    });
}

module.exports = ConnectToDB;
