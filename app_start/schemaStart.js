const fs = require('fs');
const mongoose = require('mongoose');



module.exports = (app)=>{
	return new Promise((resolve, reject)=>{
		fs.readdir('./schemas', (err, files)=>{
			if (err)
				return reject(err);

			const models = files.map(file=>{
				const schemaName = file.substr(0, file.lastIndexOf('.'));
				const schema = require(`../schemas/${schemaName}`);
				return mongoose.model(schemaName, schema);
			});
			resolve(models);
		});
	});
};