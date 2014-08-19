	//Requirements
var express = require('express'),
	users = require('./routes/users'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	port = process.env.PORT || 3000,
	uristring = process.env.MONGOLAB_URI ||
				process.env.MONGOHQ_URL ||
				'mongodb://localhost/restful',
	app = express();

	// Configuration
	app.use(bodyParser());
	app.use(methodOverride());
	mongoose.connect(uristring, function(err, res) {
		if (err)
			console.log('Error connecting to: '+uristring+'. ' + err);
		else
			console.log('Succeeded connected to: '+ uristring);
	});
	//Methods And Routes	
	app.get('/users', users.findAll); 
	app.get('/users/:id', users.findById);
	app.post('/users', users.registerUser);
	app.put('/users/:id', users.updateUser);
	app.delete('/users/:id', users.deleteUser);
	

app.listen(3000);
console.log('Listening on port 3000');