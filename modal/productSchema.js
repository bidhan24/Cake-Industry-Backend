const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CATEGORY",
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("PRODUCT", productSchema);

module.exports = Product;
