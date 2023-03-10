const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

router.get("/", (req, res) => {
  res.send("hello guyz this is from router");
});

router.post("/signin", authController.login);

router.patch("/signout", authController.logout);

router.patch("/get-otp", authController.getOtp);
router.patch("/verify-otp", authController.verifyOtp);

router.patch("/forget-password", authController.forgetPasswod);

module.exports = router;
