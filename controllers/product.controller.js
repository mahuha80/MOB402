module.exports.renderIndex = (req, res, next) => {
  res.render("index",{show:true});
};
module.exports.renderUpload = (req, res, next) => {
  res.render("upload",{show:true});
};
module.exports.renderManage=(req,res)=>{
  res.render("manage",{show:true})
}