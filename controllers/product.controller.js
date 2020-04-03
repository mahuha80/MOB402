module.exports.renderIndex = (req, res, next) => {
  res.render("index", { show: true, search: true });
};
module.exports.renderUpload = (req, res, next) => {
  res.render("upload", { show: true, search: false });
};
module.exports.renderManage = (req, res) => {
  res.render("manage", { show: true, search: false });
};
module.exports.uploadNewProduct = (req, res) => {
  let { name, price, description, type } = req.body;
  let image=req.file.path;
  console.log(req.body,image)

};
