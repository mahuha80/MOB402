const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  type: String,
  public_id:String
});
const Product = mongoose.model("Product", ProductSchema,'products');
module.exports = Product;
