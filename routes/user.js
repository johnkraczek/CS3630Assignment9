var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const user = mongoose.model('user');
const bcrypt = require('bcrypt');
const md5 = require('md5');


router.get('/logout', (req, res, next)=>{
	req.session.user = null;
	res.redirect('/user/login');
});
// getters for data about things in the database or session. 

// is the user currently logged in. 
router.get('/logged', (req, res, next )=>{
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ 'loggedIn': (req.session.user != null) }));
});

// is the email address already taken.
router.post('/emailAvail', (req, res, next)=>{
	user.count({ username: req.body.email.value }, (err, count)=>{
		res.writeHead(200, { 'Content-Type': 'application/json' });
		if(count>0)
			res.end(JSON.stringify({ 'taken': true }));
		else
			res.end(JSON.stringify({ 'taken': false }));
	});
});

router.get('/login', (req, res, next)=>{
	if(req.session.user != null)
		res.redirect('/list');
	else
		res.render('user/login', { title: 'Login' });
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
	res.render('user/register', { title: 'Register' });
});
router.post('/register',(req, res, next)=>{
	//check registration
	// set registration
	user.count({ username: req.body.email }, (err, count)=>{
		if (count>0){
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ 'auth': false }));
		} else {
			const newUser = new user();
			req.session.user = newUser.id;
			bcrypt.genSalt(10, function(err, salt){
				bcrypt.hash(req.body.password, salt, function(err, hash){
					newUser.password = hash;
					newUser.username = req.body.email;
					newUser.display = req.body.display;
					newUser.save();
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ 'auth': true }));
				});
			});
		}
	});
});

router.use((req, res, next)=>{
	if(req.session.user == null)
		res.redirect('/user/login');
	else
		next();
});

router.get('/api/fetchUser',(req, res, next)=>{
	user.findOne({ _id:req.session.user }, (err, doc)=>{
		res.writeHead(200, { 'Content-Type': 'application/json' });
		if(doc != null)
			grav = md5.digest_s(doc.email.trim().toLowerCase());
			res.end(JSON.stringify({ auth: true, email: doc.username, display: doc.display, 'email.image': grav }));
		else
			res.end(JSON.stringify({ auth: false }));
	});
});

(function(){
	function Index(req,res){
		res.render('user/index', { title: 'User Details' });
	}
	router.get('/', Index);
	router.get('/index', Index);
})();

module.exports = router;