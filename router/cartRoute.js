const express = require("express");
const router = express.Router();

const cartController = require("../controller/cartController");

router.post("/addtoCart", cartController.addToCart);
router.get("/:id", cartController.getCartByUser);

module.exports = router;
