var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const user = mongoose.model('user');
const bcrypt = require('bcrypt');

//if already logged in send to lists
router.use((req, res, next)=>{
	if(req.session.user)
		res.redirect('/list');
	else
		next();
});

router.get('/login', (req, res, next)=>{
	// render login page
	//req.session.user = 'userID';
	res.render('user/login');
});
router.post('/login',(req, res, next)=>{
	//check login
	const un = req.body.email;
	const pw = req.body.password;

	user.findOne({username:un}, (err, doc)=>{
		bcrypt.compare(pw, doc.password, function(err, login) {
		console.log('the password provided matches:' + login);
		});
	});



	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ 'response': 'return true' }));
	//set login
});
router.get('/register', (req, res, next)=>{
	// render register page
	const newUser = new user();

	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(pw, salt, function(err, hash){
			newUser.password = hash;
			newUser.username = un;
			newUser.save();
		});
	});
	res.render('user/register');
});
router.post('/register',(req, res, next)=>{
	//check registration
	// set registration
});

router.use((req, res, next)=>{
	if(!req.session.user)
		res.redirect('/user/login');
	else
		next();
});

router.get('/', (req, res, next)=>{
	res.render('/user/index');
});

router.get('/user/logout', (req, res, next)=>{
	req.session.userID = undefined;
	res.redirect('/user/login');
});


module.exports = router;