const mongoose = require('mongoose')



const FavouriteSchema = new mongoose.Schema({

image:{
    type:String,
    trim:true,
    

},


user:{
    type:mongoose.Types.ObjectId,
   
    required:[true, 'please provide user'],
    
}


})  


module.exports = mongoose.model('Fav', FavouriteSchema)