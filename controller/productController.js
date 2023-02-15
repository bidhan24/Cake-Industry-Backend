const Category = require("../modal/categorySchema");
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
    res.status(200).send({
      success: true,
      data,
      totalData: data.length,
      message: "recently added product",
    });
  } catch (e) {
    res.status(505).send({ success: false, message: e.message });
  }
};

productController.getProductByCategory = async (req, res) => {
  try {
    var mongoose = require("mongoose");
    const id = req.params.id;
    var catId = mongoose.Types.ObjectId(id);
    console.log("Ca", catId);
    const category = await Category.find({ _id: catId });
    const data = await Product.find({ category: catId });
    res.status(200).send({
      success: true,
      data,
      category,
      totalData: data.length,
      message: "data get successfully",
    });
  } catch (e) {
    res.status(505).send({ success: false, message: e.message });
  }
};

module.exports = productController;
