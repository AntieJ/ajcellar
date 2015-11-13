var express = require('express'),
    dbroute = require('./routes/db'),
    bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', dbroute.index);
app.post('/create', dbroute.create);
app.get('/dbseed', dbroute.dbSeed);
app.get('/get', dbroute.getAll);
app.get('/get/:id', dbroute.getById);
app.post('/update/:id', dbroute.update);
app.delete('/delete/:id', dbroute.delete);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});