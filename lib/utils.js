/**
 * This module exposes some common node helper functions.
 */

var fs 		= require('fs');
var path 	= require('path');

(function(module) {
    
    /**
     * Gets recursively all the files of a folder.
     */
    module.getFilesSync = function(dirname, exclude_regs) {
        var res = [];
        var should_exclude = false;
        var files = fs.readdirSync(dirname);

        exclude_regs = exclude_regs || [];
        
        for(var i in files) {
            if (!files.hasOwnProperty(i)) continue;
            
            var name = dirname + '/' + files[i];
            
            // Apply exclude regexps
            for(var j = 0; j < exclude_regs.length; j++) {
                if(exclude_regs[j].test(name)) {
                    should_exclude = true;
                    break;
                }
            }
            
            if(should_exclude) continue;
            
            if (fs.statSync(name).isDirectory()){
                res = res.concat(module.getFilesSync(name, exclude_regs));
            }
            else {
                res.push(name);
            }
        }
        
        return res;
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