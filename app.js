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
const connectDB = require('./db/connect')

const notFound = require('./MiddleWare/not-found')
const errorMiddleware = require('./MiddleWare/error-handler')

app.set('trust proxy', 1)
app.use(rateLimit({
    windowMs:15 * 60 *1000,
    max:9000
}))
app.use(cors())

app.use(helmet())


app.use(express.json())



app.get('/',  (req, res)=>{
    res.send('Task App')
})

app.use('/api/user', user)
app.use('/api/info', info)

app.use(notFound)
app.use(errorMiddleware)


const port = process.env.PORT || 8080

const start = async  ()=>{
    try{
   
        await connectDB(process.env.MONGO_URI)

        app.listen(5000, 'localhost')
        console.log(`Server is listening on port ${port}`)
    }
    catch(err){
       console.log(err)
        
    }
    
}
start()
