const Order=require('../models/order.model')
const Product=require('../models/product.model')

 exports.create=(req,res)=>{
    if(!req.body){
        return res.status(400).send({
            message: "Order must have a body"
        });
    }
    req.body.forEach(element => {
        Product.findById(element.product._id)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });            
            }
            product.quantity=product.quantity-element.requested
            product.save()
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });                
            }
        });
    });  
    const order=new Order({items:req.body}) 
    order.save()
    .then(data => {
        res.status(204).send('Order was inserted succesfully');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the order."
        });
    });
}
