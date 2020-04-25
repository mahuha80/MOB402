var express = require("express");
var router = express.Router();
var controller = require("../controllers/user.controller");
const middleware = require('../middlewares/checkLogin.middleware')
router.get("/", controller.renderLogin);
router.get("/register", controller.renderRegister);
router.get("/login", controller.renderLogin);
router.post("/register", controller.RegisterNewUser);
router.post("/login", controller.LoginUser);
router.get("/manage",middleware.requireAuth,controller.manageUser)
module.exports = router;
