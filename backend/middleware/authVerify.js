const authVerify = (req,res,next) => {
    req.cookies.token==="sapar123"?next():res.redirect("/auth")
}

module.exports = authVerify;