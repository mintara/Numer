var express = require('express');
var router = express.Router();
var cors = require('cors')
router.use(cors())
/* GET users listing. */

var mongoose = require('mongoose');

//mongoose.connect('mongodb://192.168.99.100:27017/min'); cd
mongoose.connect('mongodb+srv://min:min@cluster0-sapdc.gcp.mongodb.net/min');
var db = mongoose.connection;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var bisectionSchema = mongoose.Schema({
	id: ObjectId,
	key: String,
	fx: String,
	xl: String,
	xr: String
});

var onsSchema = mongoose.Schema({
	id: ObjectId,
	key: String,
	fx: String,
	x: String,
});

var seaSchema = mongoose.Schema({
	id: ObjectId,
	key: String,
	fx: String,
	x0: String,
	x1: String
});

var tay = mongoose.Schema({
	id: ObjectId,
	key: String,
	fx: String,
	x0: String,
	x1: String,
	n: String
});

var matrixSchema = mongoose.Schema({
	id: ObjectId,
	key: String,
	row: String,
	column: String,
	matrixa :[[]],
	matrixb :[],
	matrixc :[]
});


var BisectionModel = mongoose.model('BisectionModel', bisectionSchema, 'numer');
var onsModel = mongoose.model('onsModel', onsSchema, 'numer');
var seaModel = mongoose.model('seaModel', seaSchema, 'numer');
var tayModel = mongoose.model('tayModel', seaSchema, 'numer');
var matrixModel = mongoose.model('matrixModel', matrixSchema, 'numer');

router.get('/b', function (req, res, next) {
	BisectionModel.find({ key: 'bisection' }, function (err, docs) {
		console.log(docs)
		res.json(docs);
	})
});

router.get('/ons', function (req, res, next) {
	onsModel.find({ key: 'ons' }, function (err, docs) {
		console.log(docs)
		res.json(docs);
	})
});

router.get('/sea', function (req, res, next) {
	seaModel.find({ key: 'sea' }, function (err, docs) {
		console.log(docs)
		res.json(docs);
	})
});

router.get('/tay', function (req, res, next) {
	seaModel.find({ key: 'tay' }, function (err, docs) {
		console.log(docs)
		res.json(docs);
	})
});

router.get('/matrix', function (req, res, next) {
	matrixModel.find({ key: 'matrix' }, function (err, docs) {
		console.log(docs)
		res.json(docs);
	})
});

router.get('/cramer', function (req, res, next) {
	matrixModel.find({ key: 'cramer' }, function (err, docs) {
		console.log(docs)
		res.json(docs);
	})
});

router.get('/lu', function (req, res, next) {
	matrixModel.find({ key: 'LU' }, function (err, docs) {
		console.log(docs)
		res.json(docs);
	})
});

router.get('/trap', function (req, res, next) {
	tayModel.find({ key: 'Trap' }, function (err, docs) {
		console.log(docs)
		res.json(docs);
	})
});

module.exports = router;
