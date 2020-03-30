module.exports.renderIndex = (req, res, next) => {
  res.render("index");
};
module.exports.renderUpload = (req, res, next) => {
  res.render("upload");
};
module.exports.renderManage=(req,res)=>{
  res.render("manage")
}