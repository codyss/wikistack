var router = require('express').Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next){
	if (req.query.tag) {
		var searchTag = req.query.tag;
		// Do a search for pages that have this tag
		Page.findByTag(searchTag)
			.then(function(pages){
				res.render('index', {pages:pages})
			}, 
			function(err) {
			    res.send(err);
			    next();
		  	});
		}

	else if (req.query.urlTitle) {
		Page.findOne({ 'urlTitle': req.query.urlTitle }).then(function(page){
			console.log(page);
			page.findSimilar().then(function(pages){
				res.render('index', {pages:pages})
				}, 
				function(err) {
			    res.send(err);
			    next();
		  	});
		})


	}

	 else res.render('searchTag');

})


module.exports = router;