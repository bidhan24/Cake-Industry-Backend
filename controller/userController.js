const Auths = require("../modal/authSchema");
const User = require("../modal/userSchema");

const userController = {};

userController.addUser = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    phone,
    email,
    role,
    userRole,
    password,
  } = req.body;

  console.log(
    firstName,
    middleName,
    lastName,
    phone,
    email,
    role,
    userRole,
    password
  );

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !role ||
    !userRole ||
    !password
  ) {
    return res.status(422).json({ error: "Plz Fill all mandatory fields" });
  }

  try {
    const response = await User.findOne({ email: email });

    if (response) {
      return res.status(422).json({ error: "Email already exist" });
    }

    try {
      // save user info
      const user = new User({
        profile: req.file.path,
        firstName,
        middleName,
        lastName,
        phone,
        email,
        userRole,
      });

      await user.save();

      const newUser = await User.findOne({ email: email });

      // save login info
      const userLogin = new Auths({
        email: email,
        password: password,
        role,
        userId: newUser._id,
      });

      await userLogin.save();

      res
        .status(201)
        .json({ success: true, message: "user register successfully" });
    } catch (e) {
      return res.status(500).send({
        success: false,
        messgae: e.message,
      });
    }
  } catch (e) {
    return res.status(505).send({
      success: false,
      message: e.message,
    });
  }
};

userController.getUserDetail = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await User.findById(_id);
    res.status(200).send({
      success: true,
      data,
      totalData: data.length,
      role: "user",
      msg: "Data get Successfully",
    });
  } catch (e) {
    return res.status(505).send({
      success: false,
      message: e.message,
    });
  }
};

userController.getAllUsers = async (req, res) => {
  console.log("reee");
  try {
    console.log("sss");
    const data = await User.find({});
    res.status(200).send({
      success: true,
      data,
      totalData: data.length,
      message: "data get successfully",
    });
  } catch (e) {
    return res.status(505).send({ success: false, message: e.message });
  }
};

module.exports = userController;
