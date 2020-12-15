const express = require('express');
const { isAdmin } = require('../middlewares/admin');
const { verifyToken } = require('../middlewares/auth');
const { formatErrors } = require('../helpers/formatError');
const app = express();

const City = require('../models/city');


app.get('/cities', verifyToken, ( req, res ) => {

    City.find( (err, cities) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        res.json({
            data: cities,
            error: null
        });

    });

});

app.get('/cities/:id', verifyToken, ( req, res ) => {

    const id = req.params.id;

    City.findById(id, (err, cityDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        if(!cityDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'City not found'
                });
        }

        res.json({
            data: cityDB,
            error: null
        });

    });
    

});

app.post('/cities', [verifyToken, isAdmin], ( req, res ) => {

    let body = req.body;

    let city = new City({
        name: body.name,
        code: body.code,
        state: body.state,
    });

    city.save(( err, cityDB ) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!cityDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'City couldnt be saved'
                });
        }

        res.json({
            data: cityDB,
            error: null
        });
    });

});

app.put('/cities/:id', [verifyToken, isAdmin], (req, res) => {

    const id = req.params.id;
    const body = req.body;

    City.findOneAndUpdate(id, body, {new: true, runValidators: true}, (err, cityDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!cityDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'City not found'
                });
        }

        res.json({
            data: cityDB,
            error: null
        });

    });

});

app.delete('/cities/:id', [verifyToken, isAdmin],  (req, res) => {

    const id = req.params.id;

    City.findByIdAndDelete(id, (err, cityDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!cityDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'City not found'
                });
        }

        res.json({
            data: cityDB,
            error: null
        });

    });
    

});


module.exports = app;