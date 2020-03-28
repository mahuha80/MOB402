var express = require("express");
var router = express.Router();
var controller = require("../controllers/user.controller");
router.get("/", controller.renderLogin);
router.get("/register", controller.renderRegister);
router.get("/login", controller.renderLogin);
router.post("/register", controller.RegisterNewUser);
router.post("/login", controller.LoginUser);
module.exports = router;
