var express = require('express'),
    wines = require('./routes/wines');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', wines.index);
app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});