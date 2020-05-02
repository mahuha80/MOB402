const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemInCart = new Schema({
  productId:String,
  quantity:String,
  price: String
})
const CartSchema = new Schema({
  userId: String,
  items:[ItemInCart]
});
const Cart = mongoose.model("cart", CartSchema, "carts");
module.exports = Cart;


// [Object: null prototype] {
//   userId: '5ea5b2cf40d66e2910677158',
//   items: [
//     'productId 5e9ffe3ee15eb81d08745cbbquantity 1price35000',
//     'productId 5ea79bb03d59a8144061324equantity 1price30000',
//     'productId 5ea79bc33d59a8144061324fquantity 1price500000'
//   ]
// }
// e hỏi cách tách các cái trong items kia ra tách chay hay gì anh