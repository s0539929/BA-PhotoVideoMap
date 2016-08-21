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
// THE FIELDNAMES NED TO HAVE A DIFFERENT NAME TO THEIR EQUIVALENTS IN THE MONGODB
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
	_id:Number,
	position:{type:String,coordinates:Array},
	image:{title: String, type: String, time: String}
});
/* Mongoose Model definition */
/* Models are constructors compiled from the Schemadefinitions */
/* the Arguments are: name, schema, mongodb-collection */
var Json = mongoose.model('JString', JsonSchema, 'layercollection');

/*
Model.find(conditions, [projection], [options], [callback]) 
 --> conditions <Object> f.e. db.collection.find({"imageprops.title":"testpoint01"}) 
 --> projection <Object> optional fields of document to return: {'name':1} stands for "read field 'name'" and {'name':0} stands for "read not fild 'name'"
*/

/*handler to GET JSON data that takes an document-id as an argument */
router.get('/mapjson/:id', function(req, res, next) {
  if (req.params.id) {
  	Json.findOne({ '_id': req.params.id },{},function (err,docs) {
  		res.json(docs);
  	});
  }
});
/*handler to GET all layer names and return them as JSON*/

//shows only the imageprops.title-field returned in the JSON Array
//if 'imageprops.title':1 would be obmitted Json.find would show all of the defined JsonSchema fields
router.get('/maplayers',function (req, res, next) {
	Json.find({},{'_id':1},function (err,docs) {
		res.json(docs);
	});
});

/*Setup a page to display a page based on a request for the URL http://localhost:3000/map*/
//sends a JSON object called jmap to the map.pug template with coordinates to center the map
//the pug template has then access to this jmap variable
router.get('/map',function (req,res) {
	//var db = req.db;
	Json.find({},{}, function (err,docs) {
		res.render('map',{
			title: 'Leaflet map with style made with Mapbox Studio',
			jmap : docs,
			lat : 50.8515,
			lng : 12.8251, 
			zoom : 13,
			minZoom : 13
		})
	});
	
});

/* GET photo page. */
router.get('/photo', function(req, res, next) {
	Json.find({},{}, function (err,docs) {
  		res.render('photo', { 
  			title: 'Photos'
  		});
	});
});

module.exports = router;
