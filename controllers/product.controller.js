const fs = require('fs');
const Product = require("../models/product.model");
module.exports.renderEdit = async (req, res, next) => {
  let id = req.params.id;
  let product = await Product.find({ _id: id });
  if (id) {
    res.render("edit", {
      show: true,
      items: product,
    });
    
  }
};
module.exports.editProduct = async (req, res, next) => {
  let id = req.params.id;
  let { name, price, description, type } = req.body;
  let filepath = req.file.path;
  let path = filepath.slice(7);
  let image = path.slice(0, 7) + "/" + path.slice(8, path.length);
  let product = await Product.findOne({_id:id});
  let nameOfImgae = product.image.split('/')[1];
  let pathOfImage = `./public/uploads/${nameOfImgae}`
  fs.unlink(pathOfImage,(err)=>{
    if(err) console.log(err)
  })
  let status = await Product.updateOne(
    { _id: id },
    { name, price, image, description, type }
  );
  if (status.ok === 1) {
    res.redirect("/product");
  }
};
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
    //cái object truyền sang obs này
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
    let product = await Product.findOne({_id:rm});
    let status = await Product.deleteOne({ _id: rm });
    let name = product.image.split('/')[1];
    let path = `./public/uploads/${name}`
    fs.unlink(path,(err)=>{
      if(err) status.deletedCount=0
    })
    if (status.deletedCount > 0) {
      let products = await Product.find({});
      res.render("manage", {
        show: true,
        search: false,
        items: products,
        msg: "Xóa sản phẩm thành công",
      });
    }else{
      res.redirect('/product/manage')
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
