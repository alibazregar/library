const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.post('/login',validator.login(),controller.login)
router.post('/register',validator.register(),controller.register)


module.exports =router