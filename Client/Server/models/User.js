const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  resetToken: { 
    type: String 
  },
  resetTokenExpiration: {
    type: Date 
  },
  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
