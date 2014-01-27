/**
 * Main process unit of codebox-quickstart.
 */

var mustache    = require('mustache');
var path        = require('path');
var fs          = require('fs');
var mkdirp      = require('mkdirp');
var utils       = require('./utils.js');

/**
 *  @TODO   Recreates the utils.createFullPathSync method using base code of mkdirp
 *          with fixes (since it is not maintained apparently).
 */

(function(module) {

    var self = this;

    /**
     * Prepare the working directory to contains
     * the new addon.
     */
    module.prepareWorkingDirectory = function(working) {
        
        self.working_dir = working;
        
        // Creates the directory
        console.info("Deleting/Creating directory...");
        utils.deleteDirSync(self.working_dir);
        mkdirp.sync(path.dirname(self.working_dir));
        //utils.createFullPathSync(self.working_dir);
        
    };
    
    /**
     * Retrieve the list of templates for the new addon.
     */
    module.gatherTemplates = function(view) {
        var exclude_regs = [];
        
        if(!view.gen['server-side']) {
            exclude_regs.push(new RegExp("node/.*$"));
        }
        
        return utils.getFilesSync(path.normalize(__filename + "/../../templates/"), exclude_regs);
    };
    
    /**
     * Render all needed templates.
     */
    module.renderTemplates = function(templates_list, view) {

        var reg = new RegExp("^.*templates[\\\/]*|.mustache$", "g");
        var current_path = null;
        var dest_path = null;
        var template_content = null;
        var content = null;
        
        for(var i = 0; i < templates_list.length; i++) {
        
            current_path = path.normalize(templates_list[i]);
            dest_path = path.join(self.working_dir, current_path.replace(reg, ""));
            
            console.info("Generating %s...", dest_path);
            
            //utils.createFullPathSync(dest_path);
            mkdirp.sync(path.dirname(dest_path));
        
            template_content = fs.readFileSync(current_path, "utf8");
            content = mustache.render(template_content, view);
            
            fs.writeFileSync(dest_path, content);
        
        }
    };

})(module.exports);