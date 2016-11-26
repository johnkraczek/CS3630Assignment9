const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const list = mongoose.model('list');

const user = new Schema({
	username: { type:String,  required:true, index:{ unique:true } },
	password:{ type: String, required:true },
	display: { type: String, required:true }
});

module.exports = user;