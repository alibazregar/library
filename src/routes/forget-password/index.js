const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const User = require('./../../models/user')
require("dotenv").config()

async function isCodeSend(req,res,next) {
    const token = req.header("x-code-token")
    if(!token) res.status(401).send('access denied')

    try{
        const decoded = jwt.verify(token,process.env.JWT_KEY2)
        const user = await User.findById(decoded._id);
        req.user = user;
        next()
        }catch(ex){
          res.status(400).send('invalid token')
          
        }
}
async function isCodeIsValid(req, res, next) {
  const token = req.header("x-code-token")
  if(!token) res.status(401).send('access denied')

  try{
      const decoded = jwt.verify(token,process.env.JWT_KEY3)
      const user = await User.findById(decoded._id);
      req.user = user;
      next()
      }catch(ex){
        res.status(400).send('invalid token')
        
      }
}

router.post('/',validator.email(),controller.email)
router.post('/code',isCodeSend,validator.receiveCode(),controller.receiveCode)
router.post('/changePassword',isCodeIsValid,validator.changePassword(),controller.changePassword)


module.exports =router