const express = require('express');

const app = express();

const PayLog = require('../models/payLog');


app.get('/pay-logs', (req, res) => {

    PayLog.find( (err, payLogs) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        res.json({
            data: payLogs,
            error: null
        });

    });
});

app.get('/pay-logs/:id', (req, res) => {

    const id = req.params.id;
    PayLog.findById(id, (err, payLogDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }   

        if(!payLogDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Pay Log not found'
                });
        }

        res.json({
            data: payLogDB,
            error: null
        });

    });

});

app.post('/pay-logs', (req, res) => {

    let body = req.body;

    let payLog = new PayLog({
        date: Date.now(),
        user: body.user,
        toll_booth: body.toll_booth,
        vehicle: body.vehicle
    });

    payLog.save(( err, payLogDB ) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!payLogDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Pay Log couldnt be saved'
                });
        }

        res.json({
            data: payLogDB,
            error: null
        });
    });

});

app.put('/pay-logs/:id', (req, res) => {

    const id = req.params.id;
    const body = req.body;

    PayLog.findOneAndUpdate(id, body, {new: true, runValidators: true}, (err, payLogDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!payLogDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'Pay Log not found'
                });
        }

        res.json({
            data: payLogDB,
            error: null
        });

    });

});

app.delete('/pay-logs/:id', (req, res) => {
    const id = req.params.id;
    let body = {
        status: false
    }
    PayLog.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, payLogDB) => {

        if(err){
            return res.status(500)
                .json({
                    data: null,
                    error: err
                });
        }

        if(!payLogDB){
            return res.status(400)
                .json({
                    data: null,
                    error: 'PayLog not found'
                });
        }

        res.json({
            data: payLogDB,
            error: null
        });

    });
    
});


module.exports = app;