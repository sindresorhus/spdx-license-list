'use strict';
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var tar = require('tar');
var request = require('request');
var cv2json = require('convert-json');

// config
var url = 'http://git.spdx.org/?p=license-list.git;a=snapshot;h=HEAD;sf=tgz';
var xlsName = 'licenses/spdx_licenselist_v1.20.xls';
var folder = 'licenses';
var ignored = [
	'README.txt',
	'Updating the SPDX Licenses.txt'
];
var colValue = 'v';
var licensesJson = {};

// process the excel sheet and generate json files from it
function processXls() {
	cv2json.xls(xlsName, function (err, result) {
		if (err) {
			throw err;
		}

		var licenses = result.Sheets.licenses;
		for (var key in licenses) {
			var row = key.match(/^A(\d+)$/);
			if (row && row[1] > 1) {
				var name = licenses[row[0]][colValue].trim();
				var identifier = licenses['B' + row[1]][colValue].trim();
				var approved = licenses['E' + row[1]] ? licenses['E' + row[1]][colValue] === 'YES' : false;

				licensesJson[identifier] = {
					name: name,
					osiApproved: approved
				};
			}
		}

		fs.writeFileSync('spdx.json', JSON.stringify(licensesJson, null, '\t'));

		Object.keys(licensesJson).forEach(function (item) {
			licensesJson[item].license = fs.readFileSync(path.join(folder, item + '.txt')).toString().trim();
		});

		fs.writeFileSync('spdx-full.json', JSON.stringify(licensesJson, null, '\t'));

		//clean the licenses folder
		fs.readdir(folder, function (err, files) {
			if (err) {
				throw err;
			}

			files.forEach(function (file) {
				if (!file.match(/\.txt$/)  || ignored.indexOf(file) !== -1) {
					fs.unlink(path.join(folder, file));
				}
			});
		});
	});
}

request(url)
	.pipe(zlib.createGunzip())
	.pipe(tar.Extract({ path: folder, strip: 1}))
	.on('error', function (err) { throw err; })
	.on('end', processXls);
