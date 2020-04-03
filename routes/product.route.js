var express = require("express");
var router = express.Router();
var controller = require("../controllers/product.controller");

var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

router.get("/", controller.renderIndex);
router.get("/upload", controller.renderUpload);
router.get("/manage", controller.renderManage);
router.post("/upload", upload.single('file'),controller.uploadNewProduct);
module.exports = router;
