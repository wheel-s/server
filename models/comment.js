const mongoose = require('mongoose')



const CommentSchema = new mongoose.Schema({

comment:{
    type:String,
    trim:true,
    

},
user:{
    type:String,
    trim: true
},
img:{
    type:String,
    trim:true
  
    
},

createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'Info',
    required:[true, 'please provide user'],
    
}


})  






module.exports = mongoose.model('Comment', CommentSchema)