
const Comment = require('../models/comment.js')
const BadRequestError = require('../MiddleWare/badRequest')

const getAllComment = async (req,res)=>{
    const comment  = await Comment.find({}).sort('createdAt')
    res.status(200).json(comment)
}

const createComment= async (req, res)=>{
    try{
        
        
    const comment = await Comment.create(req.body)
     res.status(201).json({comment})
    }
     catch(error){
       
        console.log(error)
    }
}

const getComment= async (req,res)=>{
    const  {id:by} = req.params

    const comment = await Comment.findOne({
        createdBy:by
    })
    
    if(!comment){
        throw new BadRequestError( `no info with id ${commentId}`)
    }
    res.status(200).send(comment)
}



const updateComment= async(req, res)=>{
    
    const {body:{userId}, params:{id:commentId}} = req



const comment = await Comment.findByIdAndUpdate({_id:commentId, createdBy:userId}, req.body, {new:true, runValidators:true})

if(!comment){
    throw new BadRequestError( `no info with id ${commentId}`)
}
res.send({comment})

}


const deleteComment = async(req,res)=>{
   
   try{ 
    
    const  {body:{userId},params:{id:commentId}} = req
    

    const comment = await Comment.findOneAndDelete({
        _id:commentId, createdBy:userId
        
    })
    if(!comment){
        throw new BadRequestError( `no info with id ${commenrId}`)
    }
    
    res.status(200).json(' sucessfully deleted ')
}
catch(error){
    res.status(500).json({error})
    console.log(error)
}
}

module.exports = {
    getAllComment,
    createComment,
    getComment,
    updateComment,
    deleteComment,
}