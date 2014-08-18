var express = require('express'),
	restful = require('node-restful'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	port = number(process.env.PORT || 3000),
	mongoose = restful.mongoose;

var app = express();
	app.use(bodyParser());
	app.use(methodOverride());

mongoose.connect('mongodb://localhost/restful');

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