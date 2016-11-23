const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let list = new Schema({
	id:{ type: String },
	title: { type:String },
	todos:[ {
		checked:{ type:Boolean },
		text:{ type:String }
	} ]
});
module.exports = list;
