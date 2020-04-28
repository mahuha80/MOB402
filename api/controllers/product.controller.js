/**
 * params
 * null
 * method : GET
 */
const Cart = require("../../models/cart.model");
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
 * userId
 * productId
 * quantity
 * price
 *
 */
module.exports.addProductToCart = async (req, res) => {
  let { userId, productId, quantity, price } = req.body;
  let item = { productId, quantity, price };
  let cart = new Cart({
    userId: userId,
    items: {
      productId,
      quantity,
      price,
    },
  });
  cart.save((err) => {
    if (err) {
      res.json({
        msg: "can't add product to cart",
        status: "failed",
      });
    } else {
      res.json({ msg: "add product to cart successfully", status: "success" });
    }
  });
};
module.exports.getAllProductInCart = async(req,res)=>{
  let itemsCart = await Cart.find({userId:1});
  res.json({
    data:itemsCart
  })
}