
const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.URL_DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {

    if(err) throw err;

    console.log("Conectado a la DB")

});


module.exports = connect;