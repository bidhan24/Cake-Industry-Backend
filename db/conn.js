const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log("Errr", err));
