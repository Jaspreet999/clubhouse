const Message = require('../model/message');
const User = require('../model/user')
const passport = require('passport')
const bcrypt = require('bcrypt')

const {body,validationResult} = require('express-validator')



exports.login_get = function(req,res,next){
    res.render("login",{user:req.user})
}

exports.login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
})

exports.sign_up_get = function(req,res,next){
    res.render("signup")
}


exports.sign_up_post = [

    body('username','username must be required').trim().isLength({min:1}).escape(),
    body('password').trim().isLength({min:4,max:16}).withMessage('password should be min 4 digits'),
    body('confirmPassword').trim().isLength({min:4,max:16}).withMessage('password should be min 4 digits'),
    
    
    (req,res,next)=>{
  
        var errmessage = "";
        const error = validationResult(req)

        if(req.body.password !== req.body.confirmPassword){
            errmessage = "password not match"
        }

        if(!error.isEmpty()){
            res.render('signup' ,{error:error.array()[0],errMess:errmessage})
            return;
        }else{
            //const hashPassword = bcrypt.hash(req.body.password,10)
            //register user
            const user = new User({
                username:req.body.username,
                password:req.body.password,
                admin:false
            })
            user.save(function (err){
                if(err) return next(err)

                res.redirect('/login')
            })

        }
        
    }

  
]

exports.admin_get = function(req,res,next){
    res.render("admin",{user:req.user})
}


exports.admin_post = function(req,res,next){
    res.send("post sign up page")
}

exports.membership_get = function(req,res,next){
    res.render("membership",{user:req.user})
}


exports.membership_post = function(req,res,next){
    res.send("post sign up page")
}


exports.logout_post = function(req,res,next){
    req.logout()
    res.redirect("/login")
}