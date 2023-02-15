const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());

const PORT = process.env.PORT;

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/userProfile", express.static("userProfile"));
app.use("/adminProfile", express.static("adminProfile"));
app.use("/categoryImage", express.static("categoryImage"));
app.use("/productImage", express.static("productImage"));

const userRoute = require("./router/userRoute");
const adminRoute = require("./router/adminRoute");
const authRoute = require("./router/authRoute");
const categoryRoute = require("./router/categoryRoute");
const productRoute = require("./router/productRoute");
const cartRoute = require("./router/cartRoute");

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("hello from the server");
});

app.listen(PORT, () => {
  console.log(`listening from port ${PORT}`);
});
