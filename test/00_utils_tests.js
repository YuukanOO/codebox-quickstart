var utils   = require('../lib/utils');
var fs      = require('fs');
var mkdirp  = require('mkdirp');

exports.testDeleteDirSync = function(test) {

    var root_path = __dirname + "/test";
    var path = root_path + "/delete/dir/sync";
    
    mkdirp.sync(path);

    test.ok(fs.existsSync(path));

    utils.deleteDirSync(root_path);

    test.ok(!fs.existsSync(root_path));

    test.done();

};

exports.testGetFilesSync = function(test) {

    var root_path = __dirname + "/test";
    var path = root_path + "/get/files/sync";
    var path_a = __dirname + "/test/get";
    var path_b = __dirname + "/test/get/files";

    var filepath_a = path_a + "/filea.txt";
    var filepath_b = path_b + "/fileb.txt";

    mkdirp.sync(path_b);

    fs.writeFileSync(filepath_a, "Some content in a file.");
    test.ok(fs.existsSync(filepath_a));

    fs.writeFileSync(filepath_b, "Some content in b file.");
    test.ok(fs.existsSync(filepath_b));

    var results = utils.getFilesSync(root_path);

    test.equals(results.length, 2);

    utils.deleteDirSync(root_path);

    test.done();

};