const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const User = require('../models/user');



app.get('/users', (req, res) => {
    //By default return true and false states
    /**
     * First param filter 
     * Second param fields to return
     * Third param object optional
     * Fourth is callback
     */


    User.find({}, 'name last_name email role', (err, users) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        res.json({
            data: users,
            error: null
        });

    });

});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;

    User.findById(id, (err, userDB) => {

        if(err){
            return res.status(500)
                .json({
                data: null,
                error: err
            });
        }

        if(!userDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'User not found'
                });
        }

        res.json({
            data: userDB,
            error: null
        });

    });


});

app.post('/users', (req, res) => {
    let body = req.body;

    const user = new User({
        name: body.name,
        last_name: body.last_name,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        role: body.role
    });

    user.save( (err, userDB) => {

        if(err) {
            return res.status(400)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!userDB){
            return res.status(500)
                .json({
                    data: null,
                    error: 'User could not be saved'
                });
        }

        res.json({
            data: userDB,
            err: null
        });


    });
});

app.put('/users', (req, res) => {

});

app.delete('/users', (req, res) => {

});

module.exports = app;