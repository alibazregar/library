const Controller = require('./../controller')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
require("dotenv").config()
module.exports = new (class extends Controller{
   
  async register(req,res){
    
    let user = await this.User.findOne({email:req.body.email})
    if(user){
      return this.response({
        res,
        code:400,
        message: "this user already exists"
      })

    }
    const{password,firstName,lastName,email} = req.body
    user = new this.User({password,firstName,lastName,email})
    //hashing password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
    
    await user.save()
    
    this.response({
      res,
      message: "the user has been registered successfully",
      data:_.pick(user,[firstName,lastName,email])
      ,status:200 
    })
    
   }

  async login(req,res){
   
    let user = await this.User.findOne({email:req.body.email})
    if(!user){
      return this.response({
        res,
        code:400,
        message:"invalid email or password"
      }) 
    }
    //comparing password with database hashed password
    const isValid = await bcrypt.compare(req.body.password,user.password)
    if(!isValid){
      return this.response({
        res,
        code:400,
        message:"invalid email or password"
      })
    }
    //logIn and returning jsonwebtoken
    try{
      const token = jwt.sign({_id:user.id},process.env.JWT_KEY.toString())
      this.response({
        res,
        message:"successfully logged in",
        data : {token} ,
        code: 200
      })
    }catch(ex){
      res.status(400).send('invalid token')
      console.log(ex)
      }


   

  }

   
})()