const mongoose = require('mongoose')
const Schema = mongoose.Schema

const message = new Schema(
    {
        description:{type:String,required:true},
        title:{type:String,required:true},
        Date:{type:Date,default:new Date(),immutable:true},
        author:{type:Schema.Types.ObjectId,ref:'User',required:true}
    }
)

message.virtual("id").get(function(){
   return this._id
})

module.exports = mongoose.model("Message",message)