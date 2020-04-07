const Product = require("../models/product.model");
module.exports.renderIndex = async (req, res, next) => {
  if (!req.query.s) {
    let products = await Product.find({});
    let showPagnigation = Math.ceil(products.length / 9);
    let bshowPagnigation;
    if (showPagnigation == 1) {
      bshowPagnigation = false;
    } else {
      showPagnigation = true;
    }
    res.render("index", {
      show: true,
      search: true,
      items: products,
      page: bshowPagnigation,
    });
  } else {
    let s = req.query.s;
    let products = await Product.find({ name: s });
    res.render("index", {
      show: true,
      search: true,
      items: products,
    });
  }
};
module.exports.renderUpload = (req, res, next) => {
  res.render("upload", { show: true, search: false });
};
module.exports.renderManage = async (req, res) => {
  if (!req.query.rm) {
    let products = await Product.find({});
    res.render("manage", { show: true, search: false, items: products });
  } else {
    let rm = req.query.rm;
    let status = await Product.deleteOne({ _id: rm });
    if (status.deletedCount > 0) {
      let products = await Product.find({});
      res.render("manage", {
        show: true,
        search: false,
        items: products,
        msg: "Xóa sản phẩm thành công",
      });
    }
  }
};
// module.exports.editProduct
module.exports.uploadNewProduct = (req, res) => {
  let { name, price, description, type } = req.body;
  let filepath = req.file.path;
  let path = filepath.slice(7);
  let image = path.slice(0, 7) + "/" + path.slice(8, path.length);
  console.log(image);
  const product = new Product({ name, price, image, description, type });
  product.save((err) => {
    if (err) {
      res.render("upload", { err: true, show: true, search: false });
    }
    res.render("upload", { success: true, show: true, search: false });
  });
};
