Vik
=============

<img src="https://badge.fury.io/js/vik.png" />

Using <a href="http://semver.org/" target="_blank">Semver</a> to increment your `package.json` (and `bower.json`, `component.json`) npm version based on the major, minor, patch. Your `cwd` can be a child of the directory where your JSON config files reside &ndash; Vik will recursively find them thanks to <a href="https://github.com/jprichardson/node-parentpath" target="_blank">ParentPath</a>!

**Install**: `npm install vik -g` &mdash; *with `-g` (global) npm will automatically add `vik` to your `$PATH`.*

<img src="http://i.imgur.com/q6rZIsM.png" alt="Vik Screenshot" />

Commands
-------------

 * Increment major: `vik major` or `vik major+`;
 * Increment minor: `vik minor` or `vik minor+`;
 * Increment patch: `vik patch` or `vik patch+`;

You can also decrement the versions with minus:

 * Decrement major: `vik major-`;
 * Decrement minor: `vik minor-`;
 * Decrement patch: `vik patch-`;

Options
-------------

 * `-t`/`--tags` &ndash; Git tag the repository with the version;
 * `-p`/`--push` &ndash; Push the Git tag to the repository;

**Example:** `vik minor -tp`.