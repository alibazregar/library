require('express-async-errors')
const express = require('express')
const app = express()
require("dotenv").config()
const connectDB = require('./db/connect')
const winston = require('winston')


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static('public'))

//winston
process.on('uncaughtException', (ex)=>{
  winston.error(ex.message,ex);
})
process.on('unhandledRejection', (ex)=>{
  winston.error(ex.message,ex);
})

winston.add(new winston.transports.File({filename: 'logFile.log'}))
//route
app.use('/api/v1/',require('./src/routes'))


//connection
const port = process.env.PORT || 3000

const start = async ()=> {
  try{
    
    await connectDB(process.env.MONGO_URL)
    
    app.listen(port,()=>{
      console.log(` connected to database successfully and listening on port ${port}...........`)
    })
  
  }catch(err){

    console.log(`connection failed: ${err}`)

  }
} 

 start()