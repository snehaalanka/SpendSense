const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
  type: String,
  required: true,
  trim: true,
  minlength: 3,
  maxlength: 40,
  match: [/^[A-Za-z ]+$/, "Name can contain only letters and spaces"],
},

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
  type: String,
  required: true,
  minlength: 8,
},

    profileImage: {
      type: String,
      default: "",
    },
    phone: {
  type: String,
  default: "",
},

occupation: {
  type: String,
  default: "",
},
    monthlyBudget: {
  type: Number,
  default: 15000,
  min: 100,
  max: 10000000,
},

currency: {
  type: String,
  default: "INR",
},

language: {
  type: String,
  default: "English",
},
loginAttempts: {
  type: Number,
  default: 0,
},

lockUntil: {
  type: Date,
  default: null,
},
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);