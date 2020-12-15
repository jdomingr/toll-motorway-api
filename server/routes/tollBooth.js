const express = require('express');
const { isAdmin } = require('../middlewares/admin');
const { verifyToken } = require('../middlewares/auth');
const { formatErrors } = require('../helpers/formatError');
const TollBooth = require('../models/tollBooth');

const app = express();

app.get('/toll-booths', (req, res) => {

    TollBooth.find( (err, tollBoths) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        res.json({
            data: tollBoths,
            error: null
        });

    });
});

app.get('/toll-booths/:id', (req, res) => {

    const id = req.params.id;
    TollBooth.findById(id, (err, tollBoothDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        if(!tollBoothDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Toll Booth not found'
                });
        }

        res.json({
            data: tollBoothDB,
            error: null
        });

    });

});

app.post('/toll-booths', (req, res) => {

    let body = req.body;

    let tollBooth = new TollBooth({
        name: body.name,
        code: body.code,
        toll_road: body.toll_road,
    });

    tollBooth.save(( err, tollBoothDB ) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!tollBoothDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Toll Booth couldnt be saved'
                });
        }

        res.json({
            data: tollBoothDB,
            error: null
        });
    });

});

app.put('/toll-booths/:id', (req, res) => {

    const id = req.params.id;
    const body = req.body;

    TollBooth.findOneAndUpdate(id, body, {new: true, runValidators: true}, (err, tollBoothDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!tollBoothDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Toll Booth not found'
                });
        }

        res.json({
            data: tollBoothDB,
            error: null
        });

    });

});

app.delete('/toll-booths/:id', (req, res) => {
    const id = req.params.id;
    let body = {
        status: false
    }
    TollBooth.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, tollBoothDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!tollBoothDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Toll Booth not found'
                });
        }

        res.json({
            data: tollBoothDB,
            error: null
        });

    });
    
});


module.exports = app;