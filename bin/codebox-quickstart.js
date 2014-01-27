#!/usr/bin/env node

var program     = require('commander');
var path        = require('path');

var pkg         = require('../package.json');
var unit        = require('../lib/unit');

var addon_path  = null;
var view        = {};

program
    .version(pkg.version)
    .usage('[options] <addon_path>')
    .option('-s, --serverside', 'Creates needed files for server side addon.')
    .option('-e, --expert', 'Expert mode, no comment will be added to the generated code.')
    //.option('-i, --interactive', 'Interactive mode, prompt the user.')
    .parse(process.argv);

addon_path = program.args.length > 0 ? program.args[0].replace(/[\\\/]*$/, '') : null;

// If no name has been provided (and no interactive mode), exit now
if(addon_path === null/* && !program.interactive*/) {
    console.error(program.help());
    process.exit(1);
}

// Construct the view needed by mustache
view.gen = {
    'server-side': program.serverside,
    'rookie-mode': !program.expert
};

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
unit.prepareWorkingDirectory(addon_path);

// Creates templates
var templates = unit.gatherTemplates(view);
unit.renderTemplates(templates, view);

console.info("Done!");
