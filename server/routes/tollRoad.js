const express = require('express');

const { isAdmin } = require('../middlewares/admin');
const { verifyToken } = require('../middlewares/auth');
const { formatErrors } = require('../helpers/formatError');
const TollRoad = require('../models/tollRoad');

const app = express();

app.get('/toll-roads', (req, res) => {

    TollRoad.find( (err, tollRoads) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        res.json({
            data: tollRoads,
            error: null
        });

    });


  
});

app.get('/toll-roads/:id', (req, res) => {

    const id = req.params.id;
    TollRoad.findById(id, (err, tollRoadDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        if(!tollRoadDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Toll Road not found'
                });
        }

        res.json({
            data: tollRoadDB,
            error: null
        });

    });

});

app.post('/toll-roads', (req, res) => {

    let body = req.body;

    let tollRoad = new TollRoad({
        name: body.name,
        code: body.code,
        city: body.city,
    });

    tollRoad.save(( err, tollRoadDB ) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!tollRoadDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Toll Road couldnt be saved'
                });
        }

        res.json({
            data: tollRoadDB,
            error: null
        });
    });

});

app.put('/toll-roads/:id', (req, res) => {

    const id = req.params.id;
    const body = req.body;

    TollRoad.findOneAndUpdate(id, body, {new: true, runValidators: true}, (err, tollRoadDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!tollRoadDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Toll Road not found'
                });
        }

        res.json({
            data: tollRoadDB,
            error: null
        });

    });

});

app.delete('/toll-roads/:id', (req, res) => {
    const id = req.params.id;
    let body = {
        status: false
    }
    TollRoad.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, tollRoadDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!tollRoadDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Toll Road not found'
                });
        }

        res.json({
            data: tollRoadDB,
            error: null
        });

    });
    
});


module.exports = app;