const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new Schema({
  userId: String,
  items:[
      {
          productId:String,
          quantity:String,
          price: String
      }
  ]
});
const Cart = mongoose.model("cart", CartSchema, "carts");
module.exports = Cart;
