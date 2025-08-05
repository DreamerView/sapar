const authSuccess = (req,res,next) => {
    req.cookies.token==="sapar123"?res.redirect("/"):next();
}

module.exports = authSuccess;