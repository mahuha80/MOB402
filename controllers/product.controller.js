const fs = require('fs');
const Product = require("../models/product.model");
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dbsuft3kg',
  api_key: '187556512436832',
  api_secret: 'o_h3YnE8vQnneoICfSgrKH0AEgU'
});

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
  let { name, price, description, type, public_id } = req.body;
  let filepath = req.file.path;
  let path = filepath.slice(7);
  let imagePath = path.slice(0, 7) + "/" + path.slice(8, path.length);
  let product = await Product.findOne({ _id: id });
  let image = "";
  cloudinary.uploader.upload(`public/${imagePath}`, async (err, result) => {
    image = await result.url;
    let status = await Product.updateOne(
      { _id: id },
      { name, price, image, description, type, public_id }
    );
    console.log(name, price, image, description, type, public_id)
    if (status.ok === 1) {
      res.redirect("/product");
    }
  })

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
  let isRm = false;
  if (!req.query.rm) {
    let products = await Product.find({});
    res.render("manage", { show: true, search: false, items: products });
  } else {
    let rm = req.query.rm;
    let product = await Product.findOne({ _id: rm });
    let status = await Product.deleteOne({ _id: rm });
    if (status.deletedCount>0) {
      let products = await Product.find({});
      await cloudinary.uploader.destroy(product.public_id,async (err, x) => {
        console.log(x)
      })
      res.render("manage", {
        show: true,
        search: false,
        items: products,
        msg: "Xóa sản phẩm thành công",
      })
    }
    else {
      res.redirect('/product/manage')
    }
  }
};
// module.exports.editProduct
module.exports.uploadNewProduct = (req, res) => {
  let { name, price, description, type } = req.body;
  let filepath = req.file.path;
  let path = filepath.slice(7);
  let imagePath = "public/" + path.slice(0, 7) + "/" + path.slice(8, path.length);
  cloudinary.uploader.upload(imagePath,
    (error, result) => {
      if (result != null) {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log('ok');
            let image = result.url;
            let public_id = result.public_id;
            const product = new Product({ name, price, image, description, type, public_id });
            console.log(product)
            product.save((err) => {
              if (err) {
                res.render("upload", { err: true, show: true, search: false });
              }
              res.render("upload", { success: true, show: true, search: false });
            });

          }
        })
      }
    });

};
