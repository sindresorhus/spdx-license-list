'use strict';
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var tar = require('tar');
var got = require('got');
var cv2json = require('convert-json');
var globby = require('globby');
var del = require('del');

// config
var url = 'http://git.spdx.org/?p=license-list.git;a=snapshot;h=HEAD;sf=tgz';
var folder = 'licenses';
var ignored = [
	'README.txt',
	'Updating the SPDX Licenses.txt'
];
var colValue = 'v';
var licensesJson = {};

// process the excel sheet and generate json files from it
function processXls() {
	cv2json.xls(globby.sync('licenses/spdx_licenselist_*.xls')[0], function (err, result) {
		if (err) {
			throw err;
		}

		var licenses = result.Sheets.licenses;
		for (var key in licenses) {
			var row = key.match(/^A(\d+)$/);
			if (row && row[1] > 1) {
				var name = licenses[row[0]][colValue].trim();
				var identifier = licenses['B' + row[1]][colValue].trim();
				var url = licenses['C' + row[1]] ? licenses['C' + row[1]][colValue] : null;
				var approved = licenses['E' + row[1]] ? licenses['E' + row[1]][colValue] === 'YES' : false;

				licensesJson[identifier] = {
					name: name,
					url: url,
					osiApproved: approved
				};
			}
		}

		fs.writeFileSync('spdx.json', JSON.stringify(licensesJson, null, '\t'));

		Object.keys(licensesJson).forEach(function (item) {
			licensesJson[item].license = fs.readFileSync(path.join(folder, item + '.txt')).toString().trim();
		});

		fs.writeFileSync('spdx-full.json', JSON.stringify(licensesJson, null, '\t'));

		// clean the `licenses` folder
		fs.readdir(folder, function (err, files) {
			if (err) {
				throw err;
			}

			files.forEach(function (file) {
				if (!file.match(/\.txt$/)  || ignored.indexOf(file) !== -1 || /^deprecated_/.test(file)) {
					fs.unlink(path.join(folder, file));
				}
			});
		});
	});
}

del.sync('licenses');

got(url)
	.pipe(zlib.createGunzip())
	.pipe(tar.Extract({ path: folder, strip: 1}))
	.on('error', function (err) {
		throw err;
	})
	.on('end', processXls);
