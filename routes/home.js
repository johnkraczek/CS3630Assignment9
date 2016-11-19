var express = require('express');
var router = express.Router();

(function(){
	function Index(req,res){
		res.render('index', { title: 'List Application Home' });
	}
	router.get('/', Index);
	router.get('/index', Index);
	router.get('/home/index', Index);
})();

module.exports = router;
