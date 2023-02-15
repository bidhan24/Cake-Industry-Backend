const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PRODUCT",
  },

  quantity: {
    type: String,
  },

  message: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("CART", cartSchema);

module.exports = Cart;
