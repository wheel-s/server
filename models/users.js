const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
        username:{
            type:String,
            required:[true, ' please provide username'],
            trim:true,
            Maxlength:[15, 'can not be more than 15 characters']

        },
        email:{
            type:String,
            required:[true, ' please provide email'],
            trim:true,
            Maxlength:[15, 'can not be more than 15 characters'],
           
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
             'Please provide a valid email address'],
            unique:true
        },
           
    
        password:{
            type:String,
            required:[true, ' please provide passoword'],
            trim:true,
            minlength:6,
            Maxlength:[15, 'can not be more than 15 characters']

        }

})  


UserSchema.methods.comparePassword = async function(candidatePassword){
 
}




module.exports = mongoose.model('User', UserSchema)