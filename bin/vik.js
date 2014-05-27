#!/usr/bin/env node

/**
 * @module Vik
 * @author Adam Timberlake <adam.timberlake@gmail.com>
 * @link http://github.com/Wildhoney/Vik
 */
(function vik($process) {

    "use strict";

    // Title to use for the process.
    $process.title = 'vik';

    // Dependencies for the messages.
    var sys    = require('sys'),
        cmd    = require('child_process').exec,
        clc    = require('cli-color'),
        parent = require('parentpath'),
        path   = require('path'),
        nopt   = require('nopt');

    // Define the options for the parameters to be passed in.
    var options      = { tag: Boolean, push: Boolean },
        shortOptions = { t : '--tag', p: '--push' },
        parseOptions = nopt(options, shortOptions, $process.argv, 2);

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

    /**
     * @property taskOptions
     * @type {Object}
     */
    var taskOptions = { tagged: false, pushed: false };

    // List of supported modules mapping their respective JSON configuration documents
    // to their name.
    var supportedModules = [
        { name: 'npm', document: 'package.json' },
        { name: 'Bower', document: 'bower.json' },
        { name: 'Component', document: 'component.json' }
    ];

    // Iterate over each file that we wish to change the version for.
    supportedModules.forEach(function forEach(module) {

        var name = module.name,
            file = module.document;

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
                case ('major'): case ('major+'): case ('major++'): major++; minor = 0; patch = 0; break;
                case ('minor'): case ('minor+'): case ('minor++'): minor++; patch = 0; break;
                case ('patch'): case ('patch+'): case ('patch++'): patch++; break;

                // Or maybe we wish to decrement instead?
                case ('major-'): case ('major--'): major--; minor = 0; patch = 0; break;
                case ('minor-'): case ('minor--'): minor--; patch = 0; break;
                case ('patch-'): case ('patch--'): patch--; break;

            }

            // Update the version with the updated value, and then execute
            // the `npm version` command.
            version = major + '.' + minor + '.' + patch;

            // Here we go with the versioning, sunshine!
            pkg.version = version;

            // Determine if we should be adding the tag to Git.
            if (parseOptions.tag && !taskOptions.tagged) {
                taskOptions.tagged = true;
                outputMessage('Added Git tag version v' + version, 22, 122);
                cmd('git tag v' + version);
            }

            // Determine if we should push the tag via Git.
            if (parseOptions.push && !taskOptions.pushed) {
                outputMessage('Pushed Git tag version v' + version, 22, 122);
                cmd('git push --tags');
            }

            fs.writeFile(file, format.plain(pkg), function writeFile(error) {

                if (error) {
                    outputMessage('Insufficient permissions to write to ' + file, 88, 218);
                    return;
                }

                outputMessage('Updated ' + name + ' version to ' + version, 22, 122);

            });

        });

    });
    
})(process);