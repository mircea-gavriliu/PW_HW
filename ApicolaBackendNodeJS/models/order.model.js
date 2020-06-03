const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    items: [],
    isFinished: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Order', OrderSchema);