var express = require("express");
var router = express.Router();
var controller = require("../controllers/product.controller");
router.get("/", controller.renderIndex);
router.get("/upload",controller.renderUpload)
module.exports = router;
