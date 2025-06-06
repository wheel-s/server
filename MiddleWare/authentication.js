const User = require('../models/users')
const jwt = require('jsonwebtoken')
const BadRequestError = require('./badRequest')



const auth =(req, res, next)=>{
    const authHeader = req.headers.authorization
   
    if(!authHeader || !authHeader.startsWith('Bearer')){
      
         throw new BadRequestError('Invalid credentials')
    }
    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userID, name:payload.name}
        
        next()
    }
    catch(error){
        console.log(error)
    }
}

module.exports = auth