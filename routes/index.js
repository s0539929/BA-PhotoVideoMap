var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Mongoose import */
var mongoose = require('mongoose');
/* Mongoose connection to MongoDB */
mongoose.connect('mongodb://localhost:27017/leaflet_map', function (err) {
	if (err) {
		console.log(err);
	}
});
/* Mongoose Schema definition */
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
	name: String,
	type: Schema.Types.Mixed
});
/* Mongoose Model definition */
/* Models are constructors compiled from the Schemadefinitions */
/* the Arguments are: name, schema, mongodb-collection */
var Json = mongoose.model('JString', JsonSchema, 'layercollection');

/*handler to GET JSON data that takes a layer name as an argument */
router.get('/mapjson/:name', function(req, res, next) {
  if (req.params.name) {
  	Json.findOne({ 'name': req.params.name },{},function (err,docs) {
  		res.json(docs);
  	});
  }
});
/*handler to GET all layer names and return them as JSON*/
//shows only the name-field returned in the JSON Array
router.get('/maplayers',function (req, res, next) {
	Json.find({},{'name':1},function (err,docs) {
		res.json(docs);
	});
});

/*Setup a page to display a page based on a request for the URL http://localhost:3000/map*/
//sends a JSON object to the map.pug template with coordinates to center the map
router.get('/map',function (req,res) {
	//var db = req.db;
	Json.find({},{}, function (err,docs) {
		res.render('map',{
			title: 'Leaflet map with style made with Mapbox Studio',
			"jmap" : docs,
			lat : 50.8515,
			lng : 12.8251
		})
	});
	
});

module.exports = router;
