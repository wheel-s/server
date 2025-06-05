
const Fav = require('../models/favourites')
const BadRequestError = require('../MiddleWare/badRequest')

const getAllFav = async (req,res)=>{
    const infos  = await Fav.find({}).sort('createdAt')
    res.status(200).json(infos)
}

const createFav= async (req, res)=>{
    try{
        
    const info = await Fav.create(req.body)
     res.status(201).json({info})
    }
     catch(error){
       
        console.log(error)
    }
}

const getFav = async (req,res)=>{
    const { params:{id:infoId}} = req

    const info = await Fav.findOne({
        _id:infoId
    })
    
    if(!info){
        throw new BadRequestError( `no info with id ${infoId}`)
    }
    res.status(200).send(info)
}



const updateFav= async(req, res)=>{
    
    const {user:{userId}, params:{id:infoId}} = req



const info = await Fav.findByIdAndUpdate({_id:infoId, createdBy:userId}, req.body, {new:true, runValidators:true})

if(!info){
    throw new BadRequestError( `no info with id ${infoId}`)
}
res.send({info})

}


const deleteFav = async(req,res)=>{
   
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

module.exports = {
    getAllFav,
    createFav,
    getFav,
    updateFav,
    deleteFav,
}