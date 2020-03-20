var express = require('express')
var router = express.Router();
var controller=require('../controllers/user.controller')
router.post('/register',controller.RegisterNewUser);
router.get('/login',controller.LoginUser);
module.exports=router;