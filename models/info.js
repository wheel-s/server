const mongoose = require('mongoose')



const InfoSchema = new mongoose.Schema({

image:{
    type:String,    
    trim:true,

},

title:{
    type:String,
    trim: true
},
description:{
    type:String,
    trim: true
},
links:{
    type:String,
    trim: true
},
user:{
    type:String,

},
userImg:{
    type:String,
},
createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true, 'please provide user'],
    
}


},{timestamps:true})  






module.exports = mongoose.model('Info', InfoSchema)