var express = require('express'),
	restful = require('node-restful'),
	http = require('http'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	// passport = require('passport'),
	// LocalStrategy = require('passport-local'),
	// TwitterStrategy = require('passport-twitter'),
	// GoogleStrategy = require('passport-google'),
	// FacebookStrategy = require('passport-facebook'),
	port = process.env.PORT || 3000,
	uristring = process.env.MONGOLAB_URI ||
				process.env.MONGOHQ_URL ||
				'mongodb://localhost/restful',
	mongoose = restful.mongoose;
//Configuration
var app = express();
	app.use(bodyParser());
	app.use(methodOverride());

mongoose.connect(uristring, function(err, res) {
	if (err)
		console.log('Error connecting to: '+uristring+'. ' + err);
	else
		console.log('Succeeded connected to: '+ uristring);
});
//Schema Construction
var UserSchema = mongoose.Schema({
		"username": String,
		"password": String
});

//Routes and Methods
var Users = restful.model('users', UserSchema);
Users.methods(['get','post', 'put', 'delete']);
Users.register(app, '/api/users');
Users.before('post', hash_password);

function hash_password(req, res, next) {
	req.body.password = hash(req.body.password);
	next();
}


app.listen(port, function() {
	console.log('Server is running at port ' + port);
});