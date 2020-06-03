const config = require('../configs/config.config');
const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const body = req.body;


    const user = User.findOne({ username: body.username }).then(user => {
        console.log(user)
        if (!user) {
            return res.sendStatus(401);
        }
        bcrypt.compare(body.password, user.password, function (err, isMatch) {

            if (err) {
                return res.sendStatus(401);
            }
            if (!isMatch) {
                return res.sendStatus(401);
            }
            var token = jwt.sign({ userID: user.id }, config.secretKey, { expiresIn: '2h' });
            res.send({ token })
        });
    }).catch(()=>{
        return res.sendStatus(401);
    })
}

exports.create = (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Products must have a username and a password"
        });
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            console.log(user.password)
            if (err) throw err;
            user.password = hash;
            user.save()
                .then(data => {
                    res.status(204).send('Product was inserted succesfully');
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the product."
                    });
                });
        })
    });

}