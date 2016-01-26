var router = require('express').Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next){
	if(!req.query.tag) res.render('searchTag');
  else {
	var searchTag = req.query.tag;
	// Do a search for pages that have this tag
	Page.findByTag(searchTag)
	.then(function(pages){
		res.render('index', {pages:pages});
	}, function(err) {
    res.send(err);
    next();
  	});
  }

});


module.exports = router;