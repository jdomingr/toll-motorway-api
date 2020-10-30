
const mongoose = require('mongoose');
let counter = 0;
const connect = mongoose.connect(process.env.URL_DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: false
}, (err, res) => {

    if(err) throw err;

    counter++;
    console.log('Base de datos online', counter)
});


module.exports = connect;