var router = require('express').Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 
var Promise = require('bluebird');


router.get('/', function (req, res, next) {
  User.find().exec().then(function (users) {
    res.render('users', {users: users})
    // res.json(users);
  }, function (err) {console.log(err)})
})

router.get('/:id', function (req, res, next) {
  Promise.all([User.findOne({_id:req.params.id}),Page.find({author:req.params.id})]).spread(function (user, page) {
    res.render('user-profile', {user: user, pages: page});
  })


  // then(function (user) {
  //   res.render('users', {user});
  //   // res.json(users);
  // }, function (err) {console.log(err)})
})




module.exports = router;