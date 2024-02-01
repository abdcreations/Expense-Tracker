const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username missing!"],
  },
  email: {
    type: String,
    required: [true, "Email missing!"],
  },
  password: {
    type: String,
    required: [true, "Password missing!"],
    minLength: [8, "Password length too short!"],
  },
});

module.exports = mongoose.model("User", userSchema);
