const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.post('/',validator.email(),controller.email)
router.post('/code',validator.receiveCode(),controller.receiveCode)
router.post('/changePassword',validator.changePassword(),controller.changePassword)


module.exports =router