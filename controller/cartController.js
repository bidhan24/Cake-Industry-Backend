const Cart = require("../modal/cartSchema");

const cartController = {};

cartController.addToCart = async (req, res) => {
  try {
    const { userId, productId, message, quantity } = req.body;
    const data = new Cart({
      userId,
      productId,
      message,
      quantity,
    });

    await data.save();

    res
      .status(201)
      .json({ success: true, message: "Added in Cart successfully" });
  } catch (e) {
    res.status(505).send({ success: false, message: e.message });
  }
};

cartController.getCartByUser = async (req, res) => {
  try {
    var mongoose = require("mongoose");
    const id = req.params.id;
    var userId = mongoose.Types.ObjectId(id);
    const data = await Cart.find({ userId: userId })
      .populate("userId")
      .populate("productId");
    res.status(200).send({
      success: true,
      data,
      totalData: data.length,
      message: "data successfully gets",
    });
  } catch (e) {
    res.status(505).send({ success: true, message: e.message });
  }
};

module.exports = cartController;
