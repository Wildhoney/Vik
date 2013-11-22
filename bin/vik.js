#!/usr/bin/env node
"use strict";
process.title = 'vik';

var grunt   = require('grunt'),
    exec    = require('child_process').exec,
    sys     = require('sys'),
    file    = grunt.file.readJSON('package.json'),
    version = file.version,
    which   = process.argv[2].trim();

// Parse the version major.minor.patch.
var parsed  = version.match(/(\d+)\.(\d+)\.(\d+)/),
    major   = parseInt(parsed[1]),
    minor   = parseInt(parsed[2]),
    patch   = parseInt(parsed[3]);

switch (which) {
    case ('major'): major++; break;
    case ('minor'): minor++; break;
    case ('patch'): patch++; break;
}

// Update the version with the updated value, and then execute
// the `npm version` command.
version = major + '.' + minor + '.' + patch;
exec('npm version ' + version, function(error, stdout, stderr) {

    if (error) {
        sys.print(error);
        return;
    }

    sys.print('Success!');

});