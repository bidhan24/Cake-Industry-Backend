const express = require("express");
const router = express.Router();

const multer = require("multer");
const userController = require("../controller/userController");
const upload = multer({ dest: "userProfile" });

router.post("/register", upload.single("profile"), userController.addUser);
router.get("/:id", userController.getUserDetail);
router.get("/", userController.getAllUsers);

module.exports = router;
