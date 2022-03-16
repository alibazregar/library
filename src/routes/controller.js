const autoBind = require('auto-bind');
const {validationResult} = require('express-validator')
const User = require('./../models/user')
const Book = require('./../models/book')
 
module.exports =  class{

    constructor(){
        this.User = User
        this.Book = Book
    }
    //find all validation errors
    validationBody(req,res) {
      const result = validationResult(req)
      if(!result.isEmpty()){
          const errors = result.array()
          const messages =[]
          errors.forEach((err)=>messages.push(err.msg))
          res.status(400).json({
              message: "validation Error",
              data: messages
          })
      }
     } 
      //if we have an error dont go to the next one
    validate(req,res,next){
        if(this.validationBody(req,res)){
            return
        }
        next()
    }
    //for this.response
    response({res,message,code=200,data:{}}){
        res.status(code).send({data,message})
    }

   
}
