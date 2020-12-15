const express = require('express');
const { formatErrors } = require('../helpers/formatError');
const app = express();

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const User = require('../models/user');


app.post('/login', (req, res) => {

    const body = req.body;
    
    User.findOne({email: body.email}, (err, userDB) => {

        if(err){
            return res.status(500) 
                .json({
                    data: null,
                    error: err,
                    succes: false
                });
        }

        if(!userDB){
            return res.json({
                    data: null,
                    error: 'Credentials not valid',
                    success: false
                });
        }

        //If userDB exist, I will compare the password
        if(!bcrypt.compareSync(body.password, userDB.password)){
           
                return res.json({
                        data: null,
                        error: 'Credentials not valid',
                        success: false
                    });
            
        }

        const userData = new User({
            name: userDB.name,
            last_name: userDB.last_name,
            email: userDB.email,
            role: userDB.role
        });
        
        userDB = userData.getPublicFields();
        //In this point the user was found, so we can create the token
        const token = jwt.sign({
            user: userDB
        }, process.env.AUTH_SEED, { expiresIn: process.env.TOKEN_EXPIRATION_TIME});

        res.json({
            user: userDB,
            token,
            success: true
        });

    });

});


module.exports = app;