const Message = require('../model/message');
const User = require('../model/user')
const {body,validationResult} = require('express-validator')

exports.messageList = function(req,res,next){

    Message.find({})
    .populate('author')
    .exec((err,result)=>{

        if(err){
            return next(err)
        }

        res.render('home',{messages:result,user:req.user});
    })
;
}

exports.createmessage_get = function(req,res){
    res.render('createmessage',{user:req.user})
}

exports.createmessage_post = [
    body('description').trim().isLength({min:1}).withMessage({message:"please enter some text"}).escape(),

    (req,res,next)=>{

        const error = validationResult(req)

        if(!error.isEmpty()){
           res.render('createmessage',{error:error}) 
        }else{
            const user = req.user;
            if(user){
                const message = new Message({
                    title:user.username,
                    description:req.body.description,
                    author:user._id
                })
                console.log(message)
                message.save( (err)=>{
                    if(err) return next(err)

                    res.redirect('/')
                })
            }else{
                res.render('createmessage',{error:"user is not autheticated"})
            }
        }
    }
]