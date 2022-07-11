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
        console.log(req.user)
        res.render('home',{messages:result,user:req.user});
    })
;
}

exports.createmessage_get = function(req,res){
    res.render('createmessage',{user:req.user})
}

exports.createmessage_post = [
    body('description').trim().isLength({min:1}).withMessage("please enter some text").escape(),

    (req,res,next)=>{

        const error = validationResult(req)

        if(!error.isEmpty()){
            console.log(error)
           res.render('createmessage',{error:error.array()[0]}) 
        }else{
            const user = req.user;
            if(user){
                const message = new Message({
                    title:user.username,
                    description:req.body.description,
                    author:user._id
                })
                
                message.save( (err)=>{
                    if(err) return next(err)

                    res.redirect('/')
                })
            }else{
                res.render('createmessage',{errMess:"user is not autheticated"})
            }
        }
    }
]

exports.message_delete_get = function(req,res,next){
    Message.findByIdAndDelete(req.params.id)
    .exec((err)=>{
        if(err) return next(err)
        res.redirect('/')
    })
}

exports.message_update_get = function(req,res,next){

    Message.findById(req.params.id)
    .exec((err,message)=>{
        if(err) return next(err)
        
        res.render('createmessage',{message:message,user:req.user})
    })

}

exports.message_update_post = [

    body('description').trim().isLength({min:1}).withMessage("please enter some text").escape(),

    (req,res,next)=>{

        const error = validationResult(req)

        if(!error.isEmpty()){
           res.render('createmessage',{error:error.array()[0]}) 
        }else{
            const user = req.user;
            if(user){
                const message = new Message({
                    _id:req.params.id,
                    title:user.username,
                    description:req.body.description,
                    author:user._id
                })
                Message.findByIdAndUpdate(req.params.id,message,(err,message)=>{
                    if(err) return next(err)

                    res.redirect('/')
                })
                
            }else{
                res.render('createmessage',{errMess:"user is not autheticated"})
            }
        }
    }
]