const Product = require("../modal/productSchema");

const productController = {};

productController.addProduct = async (req, res) => {
  const { name, category, price, description } = req.body;

  if (!name || !category || !price || !description) {
    return res.status(422).json({ error: "Plz Fill all mandatory fields" });
  }

  try {
    const product = new Product({
      image: req.file.path,
      name,
      category,
      price,
      description,
    });

    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product Added successfully" });
  } catch (e) {
    return res.status(500).send({
      success: false,
      messgae: e.message,
    });
  }
};

productController.getAllProduct = async (req, res) => {
  try {
    const data = await Product.find({}).populate("category");
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

productController.getProductById = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Product.findById(_id).populate("category");
    res.status(200).json({
      success: true,
      data,
      totalData: data.length,
      msg: "Data get Successfully",
    });
  } catch (e) {
    return res.status(505).json({
      success: false,
      message: e.message,
    });
  }
};

productController.recentlyAdded = async (req, res) => {
  try {
    const data = await Product.find({}).sort({ date: -1 }).limit(5);
    res
      .status(200)
      .send({
        success: true,
        data,
        totalData: data.length,
        message: "recently added product",
      });
  } catch (e) {
    res.status(505).send({ success: false, message: e.message });
  }
};

module.exports = productController;
