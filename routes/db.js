var assert = require('assert'),
	mongo = require('mongodb');

var uri = 'mongodb://heroku_g8hjpjnj:1chs4grt922vnn8iroaf4aam03@ds053160.mongolab.com:53160/heroku_g8hjpjnj';

var seedData = [
  {
    aj1: 'hello1'
  },
  {
    aj2: 'hello2'
  }
];


exports.index = function(req, res) {
    res.send("MEAN API");
};

exports.dbSeed = function(req, res){
	mongo.MongoClient.connect(uri, function(err, db) {
  		assert.equal(null, err);
  		console.log("Connected correctly to server");
		var collection = db.collection('ajcollection');
		collection.insert(seedData, function(err, result) {
			if(err) throw err;
			db.close();
			});  
		});
		res.send("db");
};

exports.create = function(req, res) {//remember to include the header Content-Type: application/json
    //var user_id = req.body.aj1;
    mongo.MongoClient.connect(uri, function(err, db){
    	assert.equal(null, err);
    	console.log("Connected correctly to server")
    	var collection = db.collection('ajcollection');
    	console.log("Creating: " + req.body);
    	collection.insert(req.body, function(err, result){
    		if (err) throw err;
    		db.close;
    	})
    	res.send(req.body);
    })
};

exports.getById = function(req, res) {
	var id = req.params.id;

    mongo.MongoClient.connect(uri, function(err, db) {
  		assert.equal(null, err);
  		console.log("Connected correctly to server");
  		var collection = db.collection('ajcollection');  
		collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, docs) {
    		res.send(docs);
  		});
	});
};

exports.getAll = function(req, res){
	mongo.MongoClient.connect(uri, function(err, db) {
  		assert.equal(null, err);
  		console.log("Connected correctly to server");
  		var collection = db.collection('ajcollection');  
		collection.find({}).toArray(function(err, docs) {
    		res.send(docs);
  		});   
	});
}

exports.update = function(req, res){
	var id = req.params.id;
	var aj1FromBody = req.body.aj1;
	mongo.MongoClient.connect(uri, function(err, db){
		assert.equal(null, err);
		console.log("Connected correctly to server");
		var collection = db.collection('ajcollection');
		console.log("updating "+ id + " with body: " + JSON.stringify(aj1FromBody)); 
		collection.updateOne({_id: id},{$set:{aj1:aj1FromBody}}, function(err, results){
			if (err) throw err;
			console.log("response: "+ JSON.stringify(results));
    		db.close;
		});
		res.send(req.body);
	});
};