const Admin = require("../modal/adminSchema");
const Auths = require("../modal/authSchema");

const adminController = {};

adminController.addAdmin = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    phone,
    email,
    role,
    adminRole,
    password,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !role ||
    !adminRole ||
    !password
  ) {
    return res.status(422).json({ error: "Plz Fill all mandatory fields" });
  }

  try {
    const response = await Admin.findOne({ email: email });

    if (response) {
      return res.status(422).json({ error: "Email already exist" });
    }

    try {
      // save user info
      const admin = new Admin({
        profile: req.file.path,
        firstName,
        middleName,
        lastName,
        phone,
        email,
        adminRole,
      });

      await admin.save();

      const newAdmin = await Admin.findOne({ email: email });

      // save login info
      const userLogin = new Auths({
        email: email,
        password: password,
        role,
        adminId: newAdmin._id,
      });

      await userLogin.save();

      res
        .status(201)
        .json({ success: true, message: "Admin register successfully" });
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

adminController.getAdminDetail = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Admin.findById(_id);
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

module.exports = adminController;
