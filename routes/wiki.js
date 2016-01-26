var router = require('express').Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 



router.get('/add', function (req, res, next) {
  res.render('addpage');
})

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({ 'urlTitle': req.params.urlTitle }).then(function(page){
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
    tags: req.body.tags.split(" "),
    author: user_id
  });

  User.findOrCreate(req.body).then(function (user) {
    page.author = user._id;
    return page.save();
  }).then(function (savedPage) {
    res.redirect(savedPage.route);
  }).catch(next)
  .then(function(data) {
    console.log(data);
    res.redirect(data.route);
    }, function(err) {console.log(err)});
});


module.exports = router;