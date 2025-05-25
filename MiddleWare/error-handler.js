const CustomApiError = require('./custom-api')



const errorMiddleware = (err, req, res ,next )=>{
    if(err instanceof CustomApiError){
        return res.status(500).json(err.message)
    }

      return res.status(500).json(err.message)
}

module.exports =  errorMiddleware