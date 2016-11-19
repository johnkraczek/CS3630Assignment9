const fs = require('fs');

module.exports = function(app){
	return new Promise((resolve, reject) => {
		fs.readdir('./routes', (err, files) => {
			if(err)
				return reject(err);

			files.forEach(controller => {
				const controllerName = controller.substr(0,controller.lastIndexOf('.'));
				if(controllerName === 'home')
					app.use('/', require(`../routes/${controllerName}`));
				app.use(`/${controllerName}`, require(`../routes/${controllerName}`));
			});
			resolve(app);
		});
	});
};