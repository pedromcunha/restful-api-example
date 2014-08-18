var express = require('express'),
	http = require('http'),
	restful = require('node-restful'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	port = process.env.PORT || 3000,
	uristring = process.env.MONGOLAB_URI ||
				process.env.MONGOHQ_URL ||
				'mongodb://localhost/restful';
	mongoose = restful.mongoose;

var app = express();
	app.use(bodyParser());
	app.use(methodOverride());

mongoose.connect(uristring, function(err, res) {
	if (err)
		console.log('Error connecting to: '+uristring+'. ' + err);
	else
		console.log('Succeeded connected to: '+ uristring);
});

var ProductSchema = mongoose.Schema({
	name: String,
	sku: String,
	price: Number
});

var Products = restful.model('products', ProductSchema);
Products.methods(['get', 'put', 'post', 'delete']);
Products.register(app, '/api/products');

app.listen(port, function() {
	console.log('Server is running at port ' + port);
});