'use strict';

var download = require('download');

download({
		url: 'http://git.spdx.org/?p=license-list.git;a=snapshot;h=HEAD;sf=tgz',
		name: 'licenses.tar.gz'
	}, 'licenses', {
		extract: true,
		strip: 1,
		ext: 'application/x-gzip'
	});

