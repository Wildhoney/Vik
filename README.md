Vik
=============

<img src="https://badge.fury.io/js/vik.png" />

Using <a href="http://semver.org/" target="_blank">Semver</a> to increment your `package.json` (and `bower.json`) npm version based on the major, minor, patch. Your `cwd` can be a child of the directory where your JSON config files reside &ndash; Vik will recursively find them thanks to <a href="https://github.com/jprichardson/node-parentpath" target="_blank">ParentPath</a>!

**Install**: `npm install vik -g` &mdash; *with `-g` (global) npm will automatically add `vik` to your `$PATH`.*

Commands
-------------

 * Update major: `vik major`;
 * Update minor: `vik minor`;
 * Update patch: `vik patch`;
