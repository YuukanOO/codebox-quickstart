#!/usr/bin/env node

var program     = require('commander');
var mustache    = require('mustache');
var path        = require('path');
var fs          = require('fs');

var utils       = require('../lib/utils');

var addon_path  = null;
var view        = {};

program
    .version('0.1.0')
    .usage('[options] <name>')
    //.option('-i, --interactive', 'Interactive mode, prompt the user.')
    .parse(process.argv);

addon_path = program.args.length > 0 ? program.args[0] : null;

// If no name has been provided (and no interactive mode), exit now
if(addon_path === null/* && !program.interactive*/) {
    console.error(program.help());
    process.exit(1);
}

// Construct the view needed by mustache
view.addon = {
    'name': path.basename(addon_path),
    'version': "0.1.0",
    'path': addon_path
};

view.author = {
    'name': "Your name",
    'email': "john@doe.org",
    'url': "http://john.doe.org"
};

console.info("Building %s...", addon_path);

// Creates the directory
console.info("Deleting/Creating directory...");
utils.deleteDirSync(addon_path);
fs.mkdirSync(addon_path);

// Creates templates
var templates = utils.getFilesSync("templates");
var reg = new RegExp("^templates\/|.mustache$", "g");
var current_path = null;
var dest_path = null;
var template_content = null;
var content = null;

for(var i = 0; i < templates.length; i++) {

    current_path = templates[i];
    dest_path = path.join(addon_path, current_path.replace(reg, ""));
    
    console.info("Generating %s...", dest_path);
    
    utils.createFullPathSync(dest_path);

    template_content = fs.readFileSync(current_path, "utf8");
    content = mustache.render(template_content, view);
    
    fs.writeFileSync(dest_path, content);

}

console.info("Done!");