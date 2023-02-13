const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
  },

  otp: {
    type: Number,
  },
  expireOtp: {
    type: Number,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
  },

  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ADMIN",
  },

  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// hashing password
authSchema.pre("save", async function (next) {
  console.log("I am inside");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// we are generating token
authSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const Auths = mongoose.model("AUTH", authSchema);

module.exports = Auths;
