module.exports.requireAuth = (req, res, next) => {
  if (!req.signedCookies.userid) {
    res.json({
      msg: "Please login to continue"
    });
    return;
  }
  next();
};
