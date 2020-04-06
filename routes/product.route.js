var express = require("express");

var multer = require("multer");

var router = express.Router();

var controller = require("../controllers/product.controller");

var upload = multer({ dest: "./public/uploads/" });

router.get("/", controller.renderIndex);

router.get("/upload", controller.renderUpload);

router.get("/manage", controller.renderManage);

router.post("/upload", upload.single("image"), controller.uploadNewProduct);

router.get("/remove", controller.removeOneProduct);

router.get('/search',controller.searchProduct)
// router.get('/:id',controller.viewDetailProduct)

module.exports = router;
