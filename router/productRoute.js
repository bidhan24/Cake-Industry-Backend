const express = require("express");
const router = express.Router();

const multer = require("multer");
const productController = require("../controller/productController");
const upload = multer({ dest: "productImage" });

router.post("/add", upload.single("image"), productController.addProduct);
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProductById);
router.get("/get/recentlyAdded", productController.recentlyAdded);
router.get("/category/:id", productController.getProductByCategory);

module.exports = router;
