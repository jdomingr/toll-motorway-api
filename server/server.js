require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


//Middlewares
app.use(bodyParser.urlencoded( {extended: false} ));
//parsear a json y que solo el content-type haga match
app.use(bodyParser.json());
//In public I will have static files
app.use(express.static('public'));

//Import to use routes
app.use(require('./routes/index'));

const connect = require('./db/connection')

app.listen(3000, () => {
    console.log("Escuchando puerto 3000");
});