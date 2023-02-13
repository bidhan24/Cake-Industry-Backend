const express = require("express");
const router = express.Router();

const multer = require("multer");
const adminController = require("../controller/adminController");
const upload = multer({ dest: "adminProfile" });

router.post("/register", upload.single("profile"), adminController.addAdmin);
router.get("/:id", adminController.getAdminDetail);

module.exports = router;
