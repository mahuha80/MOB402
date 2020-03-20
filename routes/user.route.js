var express = require('express')
var router = express.Router();
var controller=require('../controllers/user.controller')
router.post('/register',controller.RegisterNewUser);
router.post('/login',controller.LoginUser);
module.exports=router;