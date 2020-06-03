var express = require('express')
var authRouter = express.Router()
var authController=require('../controllers/auth.controller')

authRouter.post('/',authController.login)
authRouter.post('/add',authController.create)

module.exports = authRouter