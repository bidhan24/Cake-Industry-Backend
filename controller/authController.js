const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Auths = require("../modal/authSchema");
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const authController = {};

authController.login = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz Fill the data" });
    }
    const userLogin = await Auths.findOne({ email: email });

    if (!userLogin) {
      res.status(400).json({ error: "Invalid Credientials" });
    } else {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credential" });
      } else {
        const userData = await Auths.findOne({ email: email });
        console.log(userData.role);
        if (userData.role === "user") {
          const data = await Auths.findOne({ email: email })
            .select("role")
            .populate("userId");

          res.json({
            success: true,
            data,
            message: "user Signin Successfully",
          });
        } else if (userData.role === "admin") {
          const data = await Auths.findOne({ email: email })
            .select("role")
            .populate("adminId");
          res.json({
            success: true,
            data,
            message: "user Signin Successfully",
          });
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

authController.logout = async (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send({ success: true, message: "user logout successfully" });
};

authController.getOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const verifyEmail = await Auths.findOne({ email });
    if (verifyEmail) {
      const otpCode = Math.floor(Math.random() * 10000 + 1);
      const setOpt = await Auths.findOneAndUpdate(
        { email },
        {
          $set: {
            otp: otpCode,
            expireOtp: new Date().getTime() + 300 * 1000,
          },
        },
        { new: true, useFindAndModify: false }
      );

      // email send
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });

      const mailOptions = {
        from: "bidhan.fyp@gmail.com",
        to: `${email}`,
        subject: "login credentials",
        text: `Your OTP to reset Your password is: ${otpCode}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent:" + info.response);
        }
      });

      res.status(200).send({
        success: true,
        setOpt,
        message: "Please check you email for OTP",
      });
    } else {
      res.status(422).send({ success: false, message: "Email Id not Matched" });
    }
  } catch (e) {
    res.status(505).send({ success: false, message: e.message });
  }
};

authController.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const verifyOTP = await Auths.findOne({
      $and: [{ email: email }, { otp: otp }],
    });
    if (verifyOTP) {
      const currentTime = new Date().getTime();
      const diff = verifyOTP.expireOtp - currentTime;
      if (diff < 0) {
        res.status(422).send({ success: false, message: "OTP expire" });
      } else {
        res
          .status(200)
          .send({ success: true, message: "OTP matched", verify: "verified" });
      }
    } else {
      res.status(422).send({ success: false, message: "invalid otp" });
    }
  } catch (e) {
    res.status(505).send({ success: false, message: e.message });
  }
};

authController.forgetPasswod = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await Auths.findOneAndUpdate(
      { email },
      {
        $set: {
          password: await bcrypt.hash(password, 12),
        },
      },
      { new: true, useFindAndModify: false }
    );

    await data.save();
    res.status(200).send({ success: true, message: "Password Updated" });
  } catch (e) {
    res.status(505).send({ success: false, message: e.message });
  }
};

module.exports = authController;
