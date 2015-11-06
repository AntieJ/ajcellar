var express = require('express'),
    wines = require('./routes/wines');

var app = express();

app.get('/', wines.index);
app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);

app.listen(5000);
console.log('Listening on port 5000...');