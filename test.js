'use strict';
var test = require('ava');
var spdxLicenseList = require('./');

test(function (t) {
	t.assert(spdxLicenseList.MIT.name === 'MIT License');
	t.assert(require('./spdx-full.json').MIT.license.length > 0);
});
