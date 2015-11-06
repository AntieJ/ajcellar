var express = require('express'),
    wines = require('./routes/wines'),
    mongo = require('mongodb'),
    assert = require('assert');

var uri = 'mongodb://heroku_g8hjpjnj:1chs4grt922vnn8iroaf4aam03@ds053160.mongolab.com:53160/heroku_g8hjpjnj';

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', wines.index);
app.get('/db', function(req, res){
	mongo.MongoClient.connect(uri, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.close();
});
});



app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});