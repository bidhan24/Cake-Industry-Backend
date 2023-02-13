const Category = require("../modal/categorySchema");

const categoryController = {};

categoryController.addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(422).json({ error: "Plz Fill all mandatory fields" });
  }

  try {
    // save user info
    const category = new Category({
      image: req.file.path,
      name,
    });

    await category.save();

    res
      .status(201)
      .json({ success: true, message: "Category Added successfully" });
  } catch (e) {
    return res.status(500).send({
      success: false,
      messgae: e.message,
    });
  }
};

categoryController.getAllCategory = async (req, res) => {
  try {
    const data = await Category.find({});
    res.status(200).send({
      success: true,
      data,
      totalData: data.length,
      msg: "Data get Successfully",
    });
  } catch (e) {
    return res.status(505).send({
      success: false,
      message: e.message,
    });
  }
};

module.exports = categoryController;
