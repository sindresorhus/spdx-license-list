'use strict';
var test = require('ava');
var spdxLicenseList = require('./');

test(function (t) {
	t.assert(spdxLicenseList.MIT.name === 'MIT License');
});
