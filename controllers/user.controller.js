const User = require("../models/user.model");
module.exports.renderRegister = (req, res) => {
  res.render("register");
};
module.exports.renderLogin = (req, res, next) => {
  res.render("login");
};
module.exports.LoginUser = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username, password);
  if (username.length == 0 || password.length == 0) {
    return;
  }
  loginUser(username, password).then(data => {
    if (data.length == 0 || data.length > 1) {
      res.render("login", {
        err: true,
        msg: "Login failed"
      });
      return;
    } else {
      res.redirect("/product");
    }
  });
};
module.exports.RegisterNewUser = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username.length == 0 || password.length == 0) {
    res.render("register", {
      err: true,
      msg: "Please enter your username and password"
    });
    return;
  }
  getUserName().then(data => {
    var usernamelist = data.map(x => {
      return x.username;
    });
    var usernameset = new Set(usernamelist);
    var currentsize = usernameset.size;
    usernameset.add(username);
    var nextsize = usernameset.size;
    if (nextsize > currentsize) {
      const user = new User({
        username,
        password
      });
      user.save(err => {
        if (err) {
          res.render("register", {
            err: true,
            msg: `Error is ${err}`
          });
        }
        res.redirect("/user/login");
      });
    } else {
      res.render("register", {
        err: true,
        msg: "User already exists in system"
      });
    }
  });
};
getUserName = async () => {
  let data = await User.find({});
  return data;
};
loginUser = async (username, password) => {
  let data = await User.find({ username, password });
  return data;
};
