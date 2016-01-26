var router = require('express').Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 



router.get('/', function (req, res, next) {
  res.redirect('/');
})

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then(function() {
    res.redirect('/');}, function(err) {console.log(err)});
  
  // -> after save -> res.redirect('/');
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
})





module.exports = router;