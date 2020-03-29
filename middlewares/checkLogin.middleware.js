module.exports.requireAuth=(req,res,next)=>{
    if(!req.signedCookies.userid){
        res.redirect('/user/login')
        return;
    }
    next()
}