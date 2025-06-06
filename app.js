require('dotenv').config()
require("express-async-error")

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

const express = require('express')
const app = express()
const user = require('./routes/users')
const info  = require('./routes/info')
const comment = require('./routes/comment')
const fav = require('./routes/favourite')
const connectDB = require('./db/connect')

const notFound = require('./MiddleWare/not-found')
const errorMiddleware = require('./MiddleWare/error-handler')

app.set('trust proxy', 1)
app.use(rateLimit({
    windowMs:15 * 60 *1000,
    max:10000
}))
app.use(cors({origin:"*"}))

app.use(helmet())


app.use(express.json())



app.get('/',  (req, res)=>{
    res.json('Task App')
})

app.use('/api/user', user)
app.use('/api/info', info)
app.use('/api/comment', comment)
app.use('/api/favourite', fav)
app.use(notFound)
app.use(errorMiddleware)


const port = process.env.PORT || 5000

const start = async  ()=>{
    try{
   
        await connectDB(process.env.MONGO_URI)

        app.listen(port)
        console.log(`Server is listening on port ${port}`)
    }
    catch(err){
       console.log(err)
        
    }
    
}
start()
