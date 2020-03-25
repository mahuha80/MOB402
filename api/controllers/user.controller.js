const User = require("../../models/user.model");
module.exports.LoginUser = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username.length == 0 || password.length == 0) {
    return;
  }
  loginUser(username, password).then(data => {
    if (data.length == 0 || data.length > 1) {
      res.json({
        status: "failed",
        msg: "login failed"
      });
      return;
    } else {
      res.json({
        status: "success",
        msg: "login successfully"
      });
    }
  });
};
module.exports.RegisterNewUser = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username.length == 0 || password.length == 0) {
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
          res.status(404).json({
            status: "failed",
            msg: `error is ${err}`
          });
        }
        res.status(200).json({
          status: "success",
          data: user,
          msg: `register new user successfully`
        });
      });
    } else {
      res.status(404).json({
        status: "failed",
        msg: "user already exists in system"
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
