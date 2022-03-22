const express = require('express')
const router =express.Router()

const error = require('./../middleware/error')

//auth route
router.use('/auth', require('./auth'))
router.use('/forget-password',require('./forget-password'))





//error-middleware
router.use(error)

module.exports = router;
