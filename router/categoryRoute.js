const express = require("express");
const router = express.Router();

const multer = require("multer");
const categoryController = require("../controller/categoryController");
const upload = multer({ dest: "categoryImage" });

router.post("/add", upload.single("image"), categoryController.addCategory);
router.get("/", categoryController.getAllCategory);

module.exports = router;
