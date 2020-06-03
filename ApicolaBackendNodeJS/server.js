const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const app = express();
var productRouter=require('./routers/products.router')
var authRouter=require('./routers/auth.router')
var orderRouter=require('./routers/orders.router')
const dbConfig = require('./configs/database.config');
const mongoose = require('mongoose');
const config = require('./configs/config.config');


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors())

app.use(expressJwt({secret: config.secretKey}).unless({path: ['/auth','/orders'],method:"GET"}));

app.use('/products',productRouter)

app.use('/orders',orderRouter)

app.use('/auth',authRouter)




mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});