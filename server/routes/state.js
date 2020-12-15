const express = require('express');
const { isAdmin } = require('../middlewares/admin');
const { verifyToken } = require('../middlewares/auth');
const { formatErrors } = require('../helpers/formatError');
const app = express();

const State = require('../models/state');


app.get('/states', verifyToken, ( req, res ) => {

    State.find( (err, states) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        res.json({
            data: states,
            error: null
        });

    });

});

app.get('/states/:id', verifyToken, ( req, res ) => {

    const id = req.params.id;

    State.findById(id, (err, stateDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        if(!stateDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'State not found'
                });
        }

        res.json({
            data: stateDB,
            error: null
        });

    });
    

});

app.post('/states', [verifyToken, isAdmin], ( req, res ) => {

    let body = req.body;

    let state = new State({
        name: body.name,
        code: body.code,
    });

    state.save(( err, stateDB ) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!stateDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'State couldnt be saved'
                });
        }

        res.json({
            data: stateDB,
            error: null
        });
    });

});

app.put('/states/:id', [verifyToken, isAdmin], (req, res) => {

    const id = req.params.id;
    const body = req.body;

    State.findOneAndUpdate(id, body, {new: true, runValidators: true}, (err, stateDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!stateDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'State not found'
                });
        }

        res.json({
            data: stateDB,
            error: null
        });

    });

});

app.delete('/states/:id', [verifyToken, isAdmin],  (req, res) => {

    const id = req.params.id;

    State.findByIdAndDelete(id, (err, stateDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!stateDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'State not found'
                });
        }

        res.json({
            data: stateDB,
            error: null
        });

    });
    

});


module.exports = app;