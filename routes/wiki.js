var router = require('express').Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 


router.get('/', function (req, res, next) {
  res.redirect('/');
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
})

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({ 'urlTitle': req.params.urlTitle }).populate('author')
  .then(function(page){
    console.log(page);
    res.render('wikipage', page);
  }, function(err){
    res.send(err)
    next();
  })
  // search the database for this

  // res.redirect('/');
})

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    tags: req.body.tags.split(" ")
  });

  User.findOrCreate(req.body).then(function (user) {
    page.author = user._id;
    return page.save();
  }).then(function (savedPage) {
    res.redirect(savedPage.route);
  }, function(err) {console.log(err);});
});


module.exports = router;