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
                admin:false,
                membership:false
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


exports.admin_post = [
    body('admincode').trim().isLength({min:4}).withMessage("Password should be greater than 4 digit").escape(),

    (req,res,next)=>{
        
        var errMess = ""
        if(req.body.admincode !== "jass123"){
            errMess = "password not match"
        }

        const errors = validationResult(req)
        
        if(!errors.isEmpty() || errMess!=""){
            
            res.render('admin',{error:errors.array()[0],errMess:errMess})
        }else{
            if(req.user){
                const user = new User({
                    _id:req.user._id,
                    username:req.user.username,
                    password:req.user.password,
                    admin:true,
                    membership:true
                })
                req.login(user, async(err) => {
                    if (err) 
                      return next(err);
                })
                
                User.findByIdAndUpdate(req.user._id,user,function(err,user){
                    if(err) return next(err)
                    
                    res.redirect("/")
                    
                })
            }else{
                res.render('admin',{errMess:"please authenticate first"})
            }
            
        }

        
    }
]

exports.membership_get = function(req,res,next){
    res.render("membership",{user:req.user})
}


exports.membership_post = [

    body('membershipcode').trim().isLength({min:4}).withMessage("Password should be greater than 4 digit").escape(),

    (req,res,next)=>{
        
        var errMess = ""
        if(req.body.membershipcode !== "jass123"){
            errMess = "password not match"
        }

        const errors = validationResult(req)
        
        if(!errors.isEmpty() || errMess!=""){
            //console.log(errMess)
            res.render('membership',{error:errors.array()[0],errMess:errMess})
        }else{
            
            if(req.user){
                const user = new User({
                    _id:req.user._id,
                    username:req.user.username,
                    password:req.user.password,
                    membership:true
                })
                req.login(user, async(err) => {
                    if (err) 
                      return next(err);
                })
                User.findByIdAndUpdate(req.user._id,user,{},function(err,user){
                    if(err) return next(err)

                    res.redirect("/")
                })
            }else{
                res.render('membership',{errMess:"please authenticate first"})
            }
            
        }

        
    }
]


exports.logout_post = function(req,res,next){
    req.logout()
    res.redirect("/login")
}