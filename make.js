'use strict';
const fs = require('fs');
const d3 = require('d3-queue');
const Ora = require('ora');
const got = require('got');

const URL = 'https://spdx.org/licenses/licenses.json';
const MAX_CONCURRENT_CONNECTIONS = 10;

const licensesJson = Object.create(null);
const spinner = new Ora();
let counter = 0;

function downloadLicense(license, callback) {
	got(license.detailsUrl, {json: true})
		.then(response => {
			const details = response.body;
			licensesJson[license.licenseId].license = details.licenseText.replace(/\r\n/g, '\n').trim();
			spinner.text = `Downloaded ${++counter} of ${Object.keys(licensesJson).length} licenses`;
			callback(null);
		})
		.catch(err => {
			callback(`Error getting URL ${license.detailsUrl}. Response is:\n${err.response.body}`);
		});
}

spinner.start();

got(URL, {json: true})
	.then(response => {
		const spdx = response.body;

		for (const license of spdx.licenses) {
			licensesJson[license.licenseId] = {
				name: license.name,
				url: license.seeAlso[0], // Only get the first of possibly multiple URLs
				osiApproved: license.isOsiApproved
			};
		}

		// Hash of hashes that maps license names to license properties
		fs.writeFileSync('spdx.json', JSON.stringify(licensesJson, null, '\t'));

		// Simple array of license names
		fs.writeFileSync('spdx-simple.json', JSON.stringify(Object.keys(licensesJson), null, '\t'));

		const q = d3.queue(MAX_CONCURRENT_CONNECTIONS);

		for (const license of spdx.licenses) {
			q.defer(downloadLicense, license);
		}

		q.awaitAll(err => {
			if (err) {
				console.error(err);
				return;
			}

			// Hash of hashes that maps license names to license properties
			// including the full license text.
			fs.writeFileSync('spdx-full.json', JSON.stringify(licensesJson, null, '\t'));

			spinner.succeed('Done');
		});
	})
	.catch(err => {
		// TODO: Remove this when https://github.com/sindresorhus/got/issues/282 is fixed
		const url = require('url').format({
			protocol: 'https:',
			hostname: err.hostname,
			pathname: err.path
		});

		console.error(`Error getting URL ${url}. Response is:\n${err.response.body}`);
	});
