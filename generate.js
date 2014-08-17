'use strict';

var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var tar = require('tar');
var Download = require('download');
var cv2json = require('convert-json');

//config
var xlsName = 'licenses/spdx_licenselist_v1.20.xls';
var folder = 'licenses';
var ignored = ['README.txt'];
var colValue = 'v';
var liceneJson = {};


//download config
var download = new Download()
		.get({ url: 'http://git.spdx.org/?p=license-list.git;a=snapshot;h=HEAD;sf=tgz', name: 'licenses.tar.gz' }, folder);


//process the excel sheet and generate json files from it
var processXls = function () {
	cv2json.xls(xlsName, function(err, result) {
		if (err) {
			throw err;
		} else {

			var licenses = result.Sheets.licenses;
			for (var key in licenses) {
				var row = key.match(/^A(\d+)$/);
				if (row && row[1] > 1) {

					var name = licenses[row[0]][colValue];
					var identifier = licenses['B' + row[1]][colValue];
					var approved = licenses['E' + row[1]] ? licenses['E' + row[1]][colValue] === 'YES' : false;
					var url = licenses['G' + row[1]][colValue];
					url = url.match(/\.txt$/) ? url : url + '.txt'; //there is issue in spreadsheet where some urls dont end with .txt , but file name contains it

					liceneJson[identifier] = {
						name: name,
						osiApproved: approved,
						url: path.join(folder, url)
					};

				}
			}

			fs.writeFileSync('spdx.json', JSON.stringify(liceneJson, null, '\t'));

			Object.keys(liceneJson).map(function (value, index) {
				liceneJson[value].license = fs.readFileSync(liceneJson[value].url).toString();
				delete liceneJson[value].url;
			});

			fs.writeFileSync('spdx-full.json', JSON.stringify(liceneJson, null, '\t'));

			//clean the licenses folder
			fs.readdir(folder, function (err, files) {
				if (err) {
					throw err;
				} else {
					files.forEach(function (file) {
						if (!file.match(/\.txt$/)  || ignored.indexOf(file) !== -1) {
							fs.unlink(path.join(folder, file));
						}
					});
				}
			});

		}
	});
};

download.run(function (err) {
	if (err) {
		throw err;
	}

	//untar it manually, as download untar will corrupt xls file
	fs.createReadStream(path.join(folder, 'licenses.tar.gz'))
		.pipe(zlib.createGunzip())
		.pipe(tar.Extract({ path: folder, strip: 1}))
		.on('error', function (err) { throw err; })
		.on('end', processXls);
});
