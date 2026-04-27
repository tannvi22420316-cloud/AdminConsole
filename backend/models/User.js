const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin"
  },

  otp:{
    type:String
  },

  otpExpiry:{
    type:Date
  },

  name: {
    type: String,
    default: ""
  },

  email: {
    type: String,
    default: ""
  },

  phone: {
    type: String,
    default: ""
  },

  image: {
    type: String,
    default: "https://i.pravatar.cc/150"
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },

  designation: {
    type: String,
    enum: ["manager", "analyst", "developer", "sales", "hr"],
    default: "analyst"
  }

}, {
  timestamps: true

});

module.exports = mongoose.model("User", UserSchema);