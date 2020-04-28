var express = require("express");

var multer = require("multer");

var router = express.Router();

var controller = require("../controllers/product.controller");

var verify = require("../routes/verify.route");


// router.get("/getAllProducts", verify.validateToken, controller.getAllProduct);

router.get("/getAllProducts", controller.getAllProduct);
router.post(
  "/removeOneProduct",
  controller.removeOneProduct
);
router.post("/addProductToCart",controller.addProductToCart)
router.get("/getAllProductInCart",controller.getAllProductInCart)

// router.post(
//   "/removeOneProduct",
//   verify.validateToken,
//   controller.removeOneProduct
// );

// router.get("/", controller.renderIndex);

// router.get("/upload", controller.renderUpload);

// router.get("/manage", controller.renderManage);

// router.post("/upload", upload.single("image"), controller.uploadNewProduct);

// router.get("/edit/:id", controller.renderEdit);

// router.post("/edit/:id", upload.single("image"), controller.editProduct);

module.exports = router;
