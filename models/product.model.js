const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name:String,
  price:Integer,
  image:String,
  color:String,
  type:String

});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
