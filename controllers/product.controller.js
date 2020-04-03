const Product = require("../models/product.model");
module.exports.renderIndex = (req, res, next) => {
  res.render("index", { show: true, search: true });
};
module.exports.renderUpload = (req, res, next) => {
  res.render("upload", { show: true, search: false });
};
module.exports.renderManage = (req, res) => {
  res.render("manage", { show: true, search: false });
};
module.exports.uploadNewProduct = (req, res) => {
  let { name, price, description, type } = req.body;
  let filepath = req.file.path;
  let image = filepath.slice(7);
  console.log(image);
  const product = new Product({ name, price, image, description, type });
  product.save(err => {
    if (err) {
      res.render("upload", { err: true, show: true, search: false });
    }
    res.render("upload", { success: true, show: true, search: false });
  });
};
