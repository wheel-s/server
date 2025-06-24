
const Info = require('../models/info')
const BadRequestError = require('../MiddleWare/badRequest')

const getAllInfo = async (req,res)=>{
    const infos  = await Info.find({}).sort('createdAt')
    res.status(200).json(infos)
}

const createInfo= async (req, res)=>{
    try{
        
    if(!req.body ||  req.body.length === 0){
        return res.status(400).json('No image data received')
    }
    req.body.createdBy=req.user.userId
    const info = await Info.create(req.body)
     res.status(201).json({info})
    }
     catch(error){
       
        console.log(error)
    }
}

const getInfo = async (req,res)=>{
    const { params:{id:infoId}} = req

    const info = await Info.findOne({
        _id:infoId
    })
    
    if(!info){
        throw new BadRequestError( `no info with id ${infoId}`)
    }
    res.status(200).send(info)
}



const getCreated = async (req,res)=>{
     const {user:{userId}} = req
     const infos  = await Info.find({createdBy:userId})
     
        if(!infos){
    throw new BadRequestError( `no info with id ${userId}`)
        }
     res.status(200).json(infos)
}

const updateInfo= async(req, res)=>{
    
    const {user:{userId}, params:{id:infoId}} = req



const info = await Info.findByIdAndUpdate({_id:infoId, createdBy:userId}, req.body, {new:true, runValidators:true})

if(!info){
    throw new BadRequestError( `no info with id ${infoId}`)
}
res.send({info})

}


const deleteInfo = async(req,res)=>{
   
   try{ 
    
    const  {user:{userId},params:{id:infoId}} = req
    

    const info = await Info.findOneAndDelete({
        _id:infoId, createdBy:userId
        
    })
    if(!info){
        throw new BadRequestError( `no info with id ${infoId}`)
    }
    
    res.status(200).json(' sucessfully deleted ')
}
catch(error){
    res.status(500).json({error})
    console.log(error)
}
}
const deleteAllInfo = async(req,res)=>{
   
   try{ 
    
    const  {user:{userId}} = req
    

    const info = await Info.findByIdAndDelete({
        createdBy:userId
        
    })
    if(!info){
        throw new BadRequestError( `no info with id ${userId}`)
    }
    
    res.status(200).json(' sucessfully deleted ')
}
catch(error){
    res.status(500).json({error})
    console.log(error)
}
}


module.exports = {
    getAllInfo,
    createInfo,
    getInfo,
    updateInfo,
    deleteInfo,
    getCreated,
    deleteAllInfo
}