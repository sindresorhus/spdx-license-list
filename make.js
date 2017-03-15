'use strict';
require('hard-rejection/register');
const fs = require('fs');
const Ora = require('ora');
const got = require('got');
const pMap = require('p-map');

const URL = 'https://spdx.org/licenses/licenses.json';
const MAX_CONCURRENT_CONNECTIONS = 10;
const spinner = new Ora();

spinner.start();

got(URL, {json: true})
	.then(res => {
		const spdx = res.body;
		const licensesJson = Object.create(null);

		for (const license of spdx.licenses) {
			licensesJson[license.licenseId] = {
				name: license.name,
				url: license.seeAlso[0], // Only get the first of possibly multiple URLs
				osiApproved: license.isOsiApproved
			};
		}

		fs.writeFileSync('spdx.json', JSON.stringify(licensesJson, null, '\t'));
		fs.writeFileSync('spdx-simple.json', JSON.stringify(Object.keys(licensesJson), null, '\t'));

		let counter = 0;

		const mapper = license => {
			return got(license.detailsUrl, {json: true})
				.then(res => {
					licensesJson[license.licenseId].licenseText = res.body.licenseText.replace(/\r\n/g, '\n').trim();
					spinner.text = `Downloaded ${++counter} of ${Object.keys(licensesJson).length} licenses`;
				})
				.catch(err => {
					throw new Error(`Error getting URL ${license.detailsUrl}. Response is:\n${err.response.body}`);
				});
		};

		return pMap(spdx.licenses, mapper, {
			concurrency: MAX_CONCURRENT_CONNECTIONS
		}).then(() => {
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

		throw new Error(`Error getting URL ${url}. Response is:\n${err.response.body}`);
	});
