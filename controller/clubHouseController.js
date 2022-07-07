exports.messageList = function(req,res,next){
    res.render('home')
}

exports.login_get = function(req,res,next){
    res.render("login")
}


exports.login_post = function(req,res,next){
    res.send("post login page")
}


exports.sign_up_get = function(req,res,next){
    res.render("signup")
}


exports.sign_up_post = function(req,res,next){
    res.send("post sign up page")
}

exports.admin_get = function(req,res,next){
    res.render("admin")
}


exports.admin_post = function(req,res,next){
    res.send("post sign up page")
}

exports.membership_get = function(req,res,next){
    res.render("membership")
}


exports.membership_post = function(req,res,next){
    res.send("post sign up page")
}