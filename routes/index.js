var router = require('express').Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

router.get('/', function (req, res, next) {
  Page.find().then(function(pages){
    res.render('index', {pages: pages});
  }, function(err) {
    res.send(err);
    next();
  });


});





module.exports = router;