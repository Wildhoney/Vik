#!/usr/bin/env node

/**
 * @module Vik
 * @author Adam Timberlake <adam.timberlake@gmail.com>
 */
(function vik($process) {

    "use strict";
    $process.title = 'vik';

    /**
     * @property files
     * @type {Array}
     */
    var files = ['package.json', 'bower.json'];

    // Dependencies for the messages.
    var sys    = require('sys'),
        clc    = require('cli-color'),
        parent = require('parentpath'),
        path   = require('path');

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

    // Iterate over each file that we wish to change the version for.
    files.forEach(function forEach(file) {

        parent(file, function parentDirectory(directory) {

            if (!directory) {

                // We were unable to find the file, so let's do nothing!
                return;

            }

            // Resolve the file to the parent directory.
            file = directory + path.sep + file;

            // All the other dependencies.
            var grunt   = require('grunt'),
                fs      = require('fs'),
                which   = $process.argv[2].trim(),
                pkg     = grunt.file.readJSON(file),
                version = pkg.version,
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

            fs.writeFile(file, format.plain(pkg), function response(error) {

                if (error) {
                    outputMessage('Insufficient permissions to write to ' + file, 88, 218);
                    return;
                }

                outputMessage('Updated version to ' + version, 22, 122);

            });

        });

    });
    
})(process);