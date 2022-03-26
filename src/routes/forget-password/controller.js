const Controller = require('../controller')
const sendEmail = require("./../../../config/sendEmail")
const Code = require('./../../models/confirmationCode')
const jwt = require('jsonwebtoken')
const PasswordReset = require('./../../models/passwordToken')
const bcrypt = require('bcrypt') 
module.exports = new (class extends Controller{
   
  async email(req,res){
  
    let user = await this.User.findOne({ email : req.body.email})
    if(!user) return this.response({res,status:400,message:"user does not exist"})
    
    let code = await Code.findOne({userId : user._id})
    if(!code){
      code = await new Code({
      userId : user._id,
      token :jwt.sign({_id:user.id},process.env.JWT_KEY2),
      code : 	Math.floor(Math.random() * 1000000)
      }).save()
    }
    const message = `your verification code is: ${code.code}` 
    await sendEmail(user.email,"password reset code",message)
    this.response({res,status:200,message:"password reset code sent successfully",data:code.token})

   
  }

  async receiveCode(req,res){
    const{_id} = req.user
    let code = await Code.findOne({userId:_id})
    if(!code){
      this.response({res,status:400,message:"code is expired"})
    }

    if(code.code!= req.body.code){
      this.response({res,status:400,message:"code is invalid"})
    }
     const passwordResetToken = await new PasswordReset({
      userId : req.user._id,
       token : jwt.sign({_id:req.user.id},process.env.JWT_KEY3),
     }).save()
     
     this.response({res,status:200,data:passwordResetToken.token})
     await Code.deleteOne({userId:_id})
  }
  
  async changePassword(req,res){
   if(req.body.password!=req.body.checkPassword){
     this.response({res,status:400,message:"passwords do not match"})
   }
   const salt = await bcrypt.genSalt(10)
   const user = await this.User.findOne({_id:req.user._id})
    user.password = await bcrypt.hash(user.password,salt)
    await user.save()
    const token = jwt.sign({_id:req.user.id},process.env.JWT_KEY.toString())
    this.response({res,status:200,message:"password changed successfully",data:{token}})
     
    await PasswordReset.deleteOne({userId : req.user._id})
 
  }
  
   
})()