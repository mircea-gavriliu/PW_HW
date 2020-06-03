var express = require('express')
var orderRouter = express.Router()
var orderController=require('../controllers/orders.controller')

orderRouter.post('/',orderController.create)

module.exports = orderRouter