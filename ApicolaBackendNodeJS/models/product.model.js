const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    image:String,
    name: String,
    price: Number,
    description: String,
    quantity: Number,
    category:Number
});

module.exports = mongoose.model('Product', ProductSchema);