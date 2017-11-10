var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Vinarija = require('../models/Vinarija.js');


/* GET /vinarija listing. */
router.get('/', function(req, res, next) {
	
	Vinarija.find(function (err, wines) {

		if (err) return next(err);
		res.json(wines);
	});
  
});

/* POST /todos */
router.post('/', function(req, res, next) {
  Vinarija.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  Vinarija.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /vinarija/:id */
router.put('/:id', function(req, res, next) {
  Vinarija.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /vinarija/:id */
router.delete('/:id', function(req, res, next) {
  Vinarija.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
