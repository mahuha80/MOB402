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
  let { userId } = req.body;
  let { items } = req.body;
  let productInCart = [];
  for(let item of items){
    let component = item.split(" ");
    let index=component[1].indexOf("quantity");
    let productId = component[1].slice(0,index);
    let index1 = component[2].indexOf("price");
    let quantity = component[2].slice(0,index1);
    let index2 = component[2].indexOf("price");
    let price = component[2].slice(index2+5,component[2].length)
    var cart ={
      productId,quantity,price
    }
    productInCart.push(cart)
  }
  const cart1 = new Cart({userId:userId,items:productInCart});
  cart1.save((err)=>{
    if(err){
      console.log("NOT OK")
      res.status(400).json({
        status:"success"
      })
    }else{
      console.log("OK")
      res.status(200).json({
        status:"success"
      })
    }
  }) 
};
module.exports.getAllProductInCart = async (req, res) => {
  let {id} = req.body
  let itemsCart = await Cart.find({ userId: id });
  res.status(200).json({
    data: itemsCart,
  });
};
