var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new mongoose.Schema({
	title: {type: String, required: true},
	urlTitle: {type: String, required: true},
	content: {type: String, required: true},
	date: {Date, default: Date.now },
	status: {type:String, enum:['open', 'closed']},
	author: mongoose.Schema.Types.ObjectID, ref: 'User'
})

pageSchema.virtual('route').get(function () {
	return "/wiki/" + this.urlTitle;
});

var userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: { type: String, required:true, unique: true, trim: true }
})

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

// populate practice
// Page.findOne({title: "???" })
// 	Page.populate('author')

module.export = {
	Page: Page,
	User: User
};