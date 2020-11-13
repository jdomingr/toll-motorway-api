
const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require('./user'));
app.use(require('./city'));
app.use(require('./state'));
app.use(require('./payLog'));
app.use(require('./tollBooth'));
app.use(require('./tollRoad'));
app.use(require('./vehicle'));

module.exports = app;