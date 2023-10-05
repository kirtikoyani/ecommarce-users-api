const mongoose = require("mongoose");
const validator = require("validator");

const userDetails = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "minimum length 3"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present"],
    validate(values: string) {
      if (!validator.isEmail(values)) {
        throw new Error("email is not correct");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(values: string) {
      if (!validator.isStrongPassword(values)) {
        throw new Error("password is not correct");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    validate(val: string) {
      if (val.toString().length < 10 || val.toString.length > 10) {
        throw new Error("Mobile no. is incorrect");
      }
    },
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  businessCategory: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// we will create collection
const User = new mongoose.model("User", userDetails);
module.exports = User;
