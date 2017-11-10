var mongoose = require('mongoose');

var VinarijaSchema = new mongoose.Schema({

	_id:String,
	name:String,
	year:Number,
	grapes:String,
	country:String,
	region:String,
	description:String,
	picture:String,
	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vinarija', VinarijaSchema);