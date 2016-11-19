var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const list = mongoose.model('list');

/* GET lists listing. */
//handle the lists Index or / page
(function(){
	function Index(req,res){
		res.render('list/list', { title: 'List Application' });
	}
	router.get('/', Index);
	router.get('/index', Index);
})();

router.get('/create', (req, res)=>{
	res.render('list/create', { title: 'Create List' });
});

(function(){
	function Index(req,res){
		const id = req.params.id;
		list.count({ _id: id }, function (err, count){ 
			if (count>0)
				res.render('list/create', { title: 'Edit List', id: id });
			else
				res.redirect('/list/create');
		});
	}
	router.get('/edit/:id', Index);
	router.get('/edit', Index);
})();


(function(){
	function edit(req, res){
		const id = req.params.id;
		if ( id == undefined )
			res.sendStatus(204);
		else{
			//go get the list from the DB
			//put it in the list object
			Promise.resolve()
			.then(()=>list.findOne({ '_id' : `${id}` }))
			.then(list => {
				res.writeHead(200);
				res.end(JSON.stringify(list));
			})
			.catch(err => {
				res.sendStatus(204);
			});
		}
	}
	router.post('/edit/:id', edit);
	router.post('/edit');
})();

router.post('/all', (req, res)=>{
		//go get the list from the DB
		//put it in the list object
		Promise.resolve()
		.then(()=>list.find({}))
		.then(lists => {
			res.writeHead(200);
			res.end(JSON.stringify(lists));
		})
		.catch(err => req.next(err));
});


// handle the API Requests. 
router.post('/api/save', (req, res)=>{
	if(req.body.id != ''){
		list.findOne({ _id : req.body.id }, function (err, doc){
			doc.title = req.body.title;
			doc.todos = req.body.todos;
			doc.save();
			res.sendStatus(200);
		});
		
	}else {
		let newList = new list(req.body);
		newList.id = newList._id;
		newList.save();
		res.writeHead(200);
		res.end(JSON.stringify(newList._id));
	}

});

router.post('/api/delete/:id', (req, res)=>{
	const id = req.params.id;
	Promise.resolve()
	.then(()=>list.remove({ '_id' : `${id}` }))
	.then(()=>{
		res.sendStatus(200);
	})
	.catch(err => {
		res.sendStatus(204);
	});
});

module.exports = router;
