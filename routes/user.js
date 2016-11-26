var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const user = mongoose.model('user');
const bcrypt = require('bcrypt');


router.get('/logout', (req, res, next)=>{
	req.session.user = null;
	res.redirect('/user/login');
});

router.get('/logged', (req, res, next )=>{
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ 'loggedIn': (req.session.user != null) }));
	//res.sendStatus(200);
});

router.get('/login', (req, res, next)=>{
	if(req.session.user != null)
		res.redirect('/list');
	else
		res.render('user/login');
});

router.post('/login',(req, res, next)=>{
	//check login
	const un = req.body.email;
	const pw = req.body.password;

	if(un == undefined || pw == undefined){
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ 'auth': false }));
		return;
	}

	user.findOne({ username:un }, (err, doc)=>{
		if (doc == undefined){
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ 'auth': false }));
		}
		else {
			bcrypt.compare(pw, doc.password, function(err, userAuthed) {
				if(userAuthed){
					req.session.user = doc.id;
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ 'auth': true }));
				}
				else {
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ 'auth': false }));
				}
			});
		}
	});
	//set login
});
router.get('/register', (req, res, next)=>{

	// render register page
	res.render('user/register');
});
router.post('/register',(req, res, next)=>{
	//check registration
	// set registration
	const newUser = new user();

	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(req.body.password, salt, function(err, hash){
			newUser.password = hash;
			newUser.username = req.body.email;
			newUser.save();
		});
	});
});

router.use((req, res, next)=>{
	if(req.session.user == null)
		res.redirect('/user/login');
	else
		next();
});

(function(){
	function Index(req,res){
		res.render('user/index');
	}
	router.get('/', Index);
	router.get('/index', Index);
})();

module.exports = router;