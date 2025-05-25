const mongoose = require('mongoose')



const InfoSchema = new mongoose.Schema({

image:{
    type:String,
    
    trim:true,
    

},
caption:{
    type:String,
    trim: true
},

createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true, 'please provide user'],
    
}


},{timestamps:true})  






module.exports = mongoose.model('Info', InfoSchema)