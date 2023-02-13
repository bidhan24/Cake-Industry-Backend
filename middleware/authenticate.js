const jwt = require("jsonwebtoken");
const Auths = require("../modal/authSchema");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await Auths.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    console.log(rootUser);
    if (!rootUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser.userId;
    req.role = rootUser.role;
    // console.log("rootUSer", rootUser);
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No token provided");
    console.log(err);
  }
};

module.exports = Authenticate;
