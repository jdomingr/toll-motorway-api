const express = require('express');
const { isAdmin } = require('../middlewares/admin');
const { verifyToken } = require('../middlewares/auth');
const { formatErrors } = require('../helpers/formatError');
const app = express();

const Vehicle = require('../models/vehicle');

app.get('/vehicles', verifyToken, ( req, res ) => {

    Vehicle.find( (err, vehicles) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        res.json({
            data: vehicles,
            error: null
        });

    });

});

app.get('/vehicles/:id', verifyToken, ( req, res ) => {

    const id = req.params.id;

    Vehicle.findById(id, (err, vehicleDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        if(!vehicleDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Vehicle not found'
                });
        }

        res.json({
            data: vehicleDB,
            error: null
        });

    });
    

});

app.post('/vehicles', [verifyToken, isAdmin], ( req, res ) => {

    let body = req.body;

    let vehicle = new Vehicle({
        type: body.type,
        amount: body.amount
    });

    vehicle.save(( err, vehicleDB ) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!vehicleDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Vehicle couldnt be saved'
                });
        }

        res.json({
            data: vehicleDB,
            error: null
        });
    });

});

app.put('/vehicles/:id', [verifyToken, isAdmin], (req, res) => {

    const id = req.params.id;
    const body = req.body;

    Vehicle.findOneAndUpdate(id, body, {new: true, runValidators: true}, (err, vehicleDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!vehicleDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Vehicle not found'
                });
        }

        res.json({
            data: vehicleDB,
            error: null
        });

    });

});

app.delete('/vehicles/:id', [verifyToken, isAdmin], (req, res) => {

    const id = req.params.id;
    const body = {
        status: false
    }

    Vehicle.findOneAndUpdate(id, body, {new: true, runValidators: true}, (err, vehicleDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!vehicleDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Vehicle not found'
                });
        }

        res.json({
            data: vehicleDB,
            error: null
        });

    });

});


module.exports = app;