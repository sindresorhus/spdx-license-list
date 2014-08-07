'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var baseUrl = 'http://git.spdx.org/';
var ignored = ['README.txt', 'Updating the SPDX Licenses.txt'];

var generateLicense = function (name, url) {
	request(baseUrl + url).on('response', function (res) {
		var data = '';
		res.on('data', function (chunk) {
			data += chunk.toString();
		});

		res.on('end', function () {
			fs.writeFile('./licenses/' + name, data, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log(name + ' was saved!');
				}
			});
		});
	});
};

request(baseUrl + '?p=license-list.git;a=tree').on('response', function (res) {
	var data = '';
	res.on('data', function (chunk) {
		data += chunk.toString();
	});

	res.on('end', function () {
		var $ = cheerio.load(data);
		$('.tree tr').each(function (i, e) {
			var name = $(e).find('a.list').text();
			var url = $(e).find('td.link a:last-child').attr('href');
			if (name.match(/\.txt$/) && ignored.indexOf(name) === -1) {
				name = name.replace(/\.txt$/, '');
				generateLicense(name, url);
			}
		});
	});
});
