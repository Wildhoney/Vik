#!/usr/bin/env node

/**
 * @module Vik
 * @author Adam Timberlake <adam.timberlake@gmail.com>
 */
(function vik($process) {

    "use strict";
    $process.title = 'vik';

    // Dependencies for the messages.
    var sys   = require('sys'),
        clc   = require('cli-color');

    /**
     * @method outputMessage
     * @param message {String}
     * @param colour {Number}
     * @param backgroundColour {Number}
     * @return {void}
     */
    var outputMessage = function outputMessage(message, colour, backgroundColour) {
        var outputMessage = clc.xterm(colour).bgXterm(backgroundColour);
        console.log(outputMessage('  ' + message + '  '));
    };

    if (!$process.argv[2]) {
        // We couldn't find any instruction for which value to increment.
        outputMessage('Forgot to specify major/minor/patch', 88, 218);
        return;
    }

    // All the other dependencies.
    var grunt   = require('grunt'),
        fs      = require('fs'),
        file    = grunt.file.readJSON('package.json'),
        version = file.version,
        which   = $process.argv[2].trim(),
        pkg     = grunt.file.readJSON('package.json'),
        format  = require('format-json');

    // Parse the version major.minor.patch.
    var parsed  = version.match(/(\d+)\.(\d+)\.(\d+)/),
        major   = parseInt(parsed[1]),
        minor   = parseInt(parsed[2]),
        patch   = parseInt(parsed[3]);

    switch (which) {

        // Which version are we going to increment?
        case ('major'): major++; minor = 0; patch = 0; break;
        case ('minor'): minor++; patch = 0; break;
        case ('patch'): patch++; break;

    }

    // Update the version with the updated value, and then execute
    // the `npm version` command.
    version = major + '.' + minor + '.' + patch;

    // Here we go with the versioning, sunshine!
    pkg.version = version;
    fs.writeFile('package.json', format.plain(pkg));
    outputMessage('Updated version to ' + version, 22, 122);
    
})(process);