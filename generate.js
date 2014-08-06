'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var ent = require('ent');
var url = 'http://spdx.org/licenses/';

var generateLicense = function (name) {
	request(url + name).on('response', function (res) {
		var data;
		res.on('data', function (chunk) {
			data += chunk.toString();
		});

		res.on('end', function () {
			var $ = cheerio.load(data);
			var text = $('.license-text').html()
				.replace(/<p>(\s+)/ig, '<p>') //some paragraphs are followed by white spaces
				.replace(/<\/p>(\s+)<p>/ig, '\r\n') //line breaks
				.replace(/(<([^>]+)>)/ig, ''); //remove tags

			fs.writeFile('./licenses/' + name, ent.decode(text.trim()), function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log(name + ' was saved!');
				}
			});
		});
	});
};

request(url).on('response', function (res) {
	var data;
	res.on('data', function (chunk) {
		data += chunk.toString();
	});

	res.on('end', function () {
		var $ = cheerio.load(data);
		$('#page-inner table tr code').each(function (i, e) {
			generateLicense($(e).text());
		});
	});
});
