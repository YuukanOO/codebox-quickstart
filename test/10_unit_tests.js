var unit 	= require('../lib/unit');
var fs		= require('fs');

exports.testPrepareWorkingDirectory = function(test) {

	var path = __dirname + "/my/custom/module";
	
	//unit.prepareWorkingDirectory(path);

	test.done();

};