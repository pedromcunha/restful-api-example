exports.findAll = function(req, res) {
	res.send([{name: 'Pedro'}, {name: 'Andre'}]);
};

exports.findById = function(req, res) {
	res.send({id:req.params.id, name: "The Name", description: "description"});
};

exports.registerUser = function(req, res) {
	var user = user.body;
	console.log('Adding user: '+JSON.stringify(user));
	
};