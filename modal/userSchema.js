const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  profile: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },

  middleName: {
    type: String,
  },

  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },

  userRole: {
    type: String,
  },
});

const User = mongoose.model("USER", userSchema);

module.exports = User;
