'use strict';
var d3 = require('d3-queue');
var fs = require('fs');
var got = require('got');

// config
const URL = 'https://spdx.org/licenses/licenses.json';
const MAX_CONCURRENT_CONNECTIONS = 10;

var licensesJson = {};
var counter = 0;

function downloadLicense(license, callback) {
	got(license.detailsUrl, { json: true })
		.then(response => {
			var details = response.body;
			licensesJson[license.licenseId].license = details.licenseText.replace(/\r\n/g, '\n').trim();
			console.log(`Downloaded ${++counter} of ${Object.keys(licensesJson).length} license(s).`)
			callback(null);
		})
		.catch(error => {
			callback(`Error getting URL ${license.detailsUrl}. Response is:\n${error.response.body}`);
		});
}

got(URL, { json: true })
	.then(response => {
		var spdx = response.body;

		for (const license of spdx.licenses) {
			licensesJson[license.licenseId] = {
				name: license.name,
				url: license.seeAlso[0], // Only get the first of possibly multiple URLs.
				osiApproved: license.isOsiApproved
			};
		}

		// Hash of hashes that maps license names to license properties.
		fs.writeFileSync('spdx.json', JSON.stringify(licensesJson, null, '\t'));

        // Simple array of license names.
		fs.writeFileSync('spdx-simple.json', JSON.stringify(Object.keys(licensesJson), null, '\t'));

		var q = d3.queue(MAX_CONCURRENT_CONNECTIONS);
		for (const license of spdx.licenses) {
			q.defer(downloadLicense, license);
		}
		q.awaitAll((error, terms) => {
			if (error) {
				console.log(error);
			} else {
				// Hash of hashes that maps license names to license properties
                // including the full license text.
				fs.writeFileSync('spdx-full.json', JSON.stringify(licensesJson, null, '\t'));
			}
		});
	})
	.catch(error => {
		console.log(`Error getting URL ${url}. Response is:\n${error.response.body}`);
	});
