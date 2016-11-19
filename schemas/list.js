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


// let toDoItem = new Schema({
// 	checked:{ type:Boolean,reqired: true },
// 	text:{ type:String, required:true }
// });

// const list = Schema({
// 	title: { type:String, required: true },
// 	todos:[ toDoItem ]
// });