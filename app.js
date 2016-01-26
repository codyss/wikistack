var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var routes = require('./routes/');
var wikiRoutes = require('./routes/wiki');
var searchRoutes = require('./routes/search');
var userRoutes = require('./routes/users');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
require('./filters')(swig);
var path = require('path');
var fs = require('fs');

//set up swing
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

//log the requets
app.use(morgan('dev'));

//static routing for public file
app.use(express.static(path.join(__dirname, '/public')));

//Read in for post requests
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json());

//All routes go to routes
app.use('/wiki/', wikiRoutes);
app.use('/search/', searchRoutes);
app.use('/users/', userRoutes);
app.use('/', routes);


app.listen(port);
console.log('Magic happening on: ', port);
