var express = require('express')
var productRouter = express.Router()
var productController=require('../controllers/products.controller')

productRouter.get('/',productController.getAll)

productRouter.get('/search',productController.search)

productRouter.get('/:productId',productController.getById)

productRouter.get('/getFiltered/:category',productController.getByCategory)

productRouter.post('/',productController.create)

productRouter.put('/:productId',productController.update)

productRouter.delete('/:productId',productController.delete)

module.exports = productRouter