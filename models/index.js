var mongoose = require('mongoose');
var marked = require('marked');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new mongoose.Schema({
	title: {type: String, required: true},
	urlTitle: {type: String, required: true},
	content: {type: String, required: true},
	date: {type: Date, default: Date.now },
	tags: {type: Array, index: true},
	status: {type:String, enum:['open', 'closed']},
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

pageSchema.pre('validate', function(next) {
  this.urlTitle = urlify(this.title);
  next();
});

pageSchema.virtual('route').get(function () {
	return "/wiki/" + this.urlTitle;
});

pageSchema.virtual('renderedContent').get(function() {
	return marked(this.content);
});

pageSchema.statics.findByTag = function (tag) {
	return this.find({ tags: {$elemMatch: { $eq: tag}}});
};

pageSchema.methods.findSimilar = function(){
	return this.model('Page').find({tags: {$in: this.tags},  urlTitle: {$ne: this.urlTitle}});
}

var userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: { type: String, required:true, unique: true, trim: true }
});

userSchema.statics.findOrCreate = function (userObj) {
	var self = this;
	return self.findOne({ email: userObj.email }).exec()
	.then(function(user){ if(user) {
		//user exits - return a promise for it
		return user;
	} else {
		//no user
		  return self.create({
    		name: userObj.author,
    		email: userObj.email
  		});
		}
	});
};

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

// populate practice
// Page.findOne({title: "???" })
// 	Page.populate('author')

function urlify (str){
    return str ? str.replace(/\s/g, "_").replace(/\W/g, ""): Math.random().toString(36).substring(2, 7);

}


module.exports = {
	Page: Page,
	User: User
};