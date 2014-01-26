/**
 * This module exposes some common node helper functions.
 */

var fs = require('fs');
var path = require('path');

(function(module) {
    
    /**
     * Gets recursively all the files.
     */
    module.getFilesSync = function(dirname) {
        var res = [];
        var files = fs.readdirSync(dirname);
        
        for(var i in files) {
            if (!files.hasOwnProperty(i)) continue;
            
            var name = dirname + '/' + files[i];
            
            if (fs.statSync(name).isDirectory()){
                res = res.concat(module.getFilesSync(name));
            }
            else {
                res.push(name);
            }
        }
        
        return res;
    };
    
    /**
     * Creates a full path like mkdir -p.
     */
    module.createFullPathSync = function(fpath) {
        
        var parts = path.dirname(path.normalize(fpath)).split(path.sep);
        var path_to_create = [];
        var working = '/';
        var i = 0;
        
        for(i = 0; i < parts.length; i++) {
            
            working = path.join(working, parts[i]);
            path_to_create.push(working);
            
        }
        
        for(i = 0; i < path_to_create.length; i++) {
            
            working = path_to_create[i];
            
            if(!fs.existsSync(working)) {
                fs.mkdirSync(working);
            }
            
        }
        
    };
    
    /**
     * Delete recursively a folder and all its content.
     */
    module.deleteDirSync = function(dirname) {
        if(fs.existsSync(dirname)) {
            fs.readdirSync(dirname).forEach(function(file, index) {
                var curPath = dirname + "/" + file;
                if(fs.statSync(curPath).isDirectory()) {
                    module.deleteDirSync(curPath);
                } 
                else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(dirname);
        }
    };
    
})(module.exports);