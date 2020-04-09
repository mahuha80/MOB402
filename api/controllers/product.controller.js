/**
 * params
 * null
 * method : GET
 */
const Product = require("../../models/product.model");
module.exports.getAllProduct = async (req, res, next) => {
  let products = await Product.find({});
  if (products.length > 0) {
    res.status(200).json({
      status: "success",
      data: products,
      msg: "get all products successfully",
    });
  } else {
    res.status(404).json({
      status: "failed",
      msg: `data not found`,
    });
  }
};
/**
 * params
 * id
 * method : POST
 */
module.exports.removeOneProduct = async (req, res, next) => {
  let { id } = req.body;
  let status = await Product.deleteOne({ _id: id });
  if (status.deletedCount > 0) {
    res.status(200).json({
      status: "success",
      msg: "remove one product successfully",
    });
  } else {
    res.status(400).json({
      status: "failed",
      msg: "remove one product failed",
    });
  }
};
/**
 * params
 * 
 */



