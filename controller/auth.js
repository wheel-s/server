
const User = require('../models/users')
const BadRequestError = require('../MiddleWare/badRequest')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { findOneAndUpdate, findOneAndDelete } = require('../models/info')

const register = async (req, res)=>{
   
    const {username, email, password} = req.body

    
    if(!req.body){
        throw new BadRequestError('fields cannot be empty')
    }
    

    const hashedPassword = await bcrypt.hash(password, 10)
    const tempUser = {username, email, password:hashedPassword}


    
    const user = await User.create({...tempUser})
    const token = jwt.sign({userID:user._id , name:user.username}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
    res.status(201).json({user:user.username,userId:user._id, token:token})
   
   
  
  

}
const login = async (req,res)=>{
    
   
    const {email, password} = req.body

        
    if(!email || !password){
        throw new BadRequestError ('fields cannot be empty')
    }
    const user = await User.findOne({email})
        
    if(!user){
        throw new BadRequestError('no user found')
    }
    const token = jwt.sign({userID:user._id , name:user.username}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})


   
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch){
           throw new BadRequestError(' invalid credentials')
    }

 

    res.status(200).json({user:user.username,userId:user._id, token})





 }

    


 const getUser= async(req, res)=>{
    try{
        const {id:userId} = req.params
        const user =  await User.findOne({_id:userId})

        if(!user){
            return res.status(404).json(`no user found`)
        }

        res.status(200).json({user})('-password')
    }
    catch(error){
        res.status(500).json({error})
    }
}



const updateUser= async(req, res)=>{
   
    try{
        const {id:userId} = req.params
        const user = await User.findOneAndUpdate({_id:userId}, req.body, {new:true, runValidators:true})

        if(!user){
            return res.status(404).json(`no user found`)
        }

        res.status(200).json({user})
    }
      catch(error){
        res.status(500).json({error})
    }
   

}

const deleteUser = async(req,res)=>{
    
    try{
        const {id:userId} = req.params
        const user = await User.findOneAndDelete({_id:userId})
        if(!user){
            return res.status(404).json(`no user found`)
        }

        
        res.status(200).send('deleted user')
    }
    catch(error){
        res.status(500).json({error})
    }
   
   
}

module.exports = {

    register,
    login,
    getUser,
    updateUser,
    deleteUser,
}