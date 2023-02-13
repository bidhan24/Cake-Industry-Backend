const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("CATEGORY", categorySchema);

module.exports = Category;
