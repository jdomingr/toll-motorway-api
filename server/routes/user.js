const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { verifyToken } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/admin');



app.get('/users', [verifyToken, isAdmin], (req, res) => {
    //By default return true and false states
    /**
     * First param filter 
     * Second param fields to return
     * Third param object optional
     * Fourth is callback
     */


    User.find({}, '_id, name last_name email role status', (err, users) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err,
                    success: false
                });
        }

        res.json({
            data: users,
            error: null,
            success: true
        });

    });

});

app.get('/users/:id', [verifyToken, isAdmin],  (req, res) => {
    const id = req.params.id;

    User.findById(id, (err, userDB) => {

        if(err){
            return res.status(500)
                .json({
                data: null,
                error: err,
                success: false
            });
        }

        if(!userDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'User not found',
                    success: false
                });
        }

       
        res.json({
            data: userDB,
            error: null,
            success: true
        });

    });


});

app.post('/users', [verifyToken, isAdmin], (req, res) => {
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
            let error = {};
            Object.keys(err.errors).forEach( (key) => {
                error[key] = err.errors[key].message;
            });

            return res.status(400)
                .json({
                    data: null,
                    error: error,
                    success: false
                });
        }

        if(!userDB){
            return res.status(500)
                .json({
                    data: null,
                    error: 'User could not be saved',
                    success: false
                });
        }

        //Returns only public fields
        userDB = user.getPublicFields();

        res.json({
            data: userDB,
            error: null,
            success: true
        });


    });
});

app.put('/users/:id', [verifyToken, isAdmin], (req, res) => {

    const id = req.params.id;
    const body = req.body;

    User.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err,
                    success: false
                });
        }

        if(!userDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'User not found',
                    success: false
                });
        }

        res.json({
            data: userDB,
            error: null,
            success: true
        });

    });

});

app.delete('/users/:id', [verifyToken, isAdmin], (req, res) => {

    const id = req.params.id;
    const body = { status: false};

    User.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err,
                    success: false
                });
        }

        if(!userDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'User not found',
                    success: false
                });
        }

        res.json({
            data: userDB,
            error: null,
            success: true
        });

    });

});

module.exports = app;