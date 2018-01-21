'use strict';
require('hard-rejection/register'); // eslint-disable-line import/no-unassigned-import
const fs = require('fs');
const Ora = require('ora');
const got = require('got');
const pMap = require('p-map');

const URL = 'https://spdx.org/licenses/licenses.json';
const MAX_CONCURRENT_CONNECTIONS = 10;
const spinner = new Ora();

spinner.start();

(async () => {
	const res = await got(URL, {json: true});

	const spdx = res.body;
	const licensesJson = Object.create(null);

	for (const license of spdx.licenses) {
		licensesJson[license.licenseId] = {
			name: license.name,
			url: (Array.isArray(license.seeAlso) ?
				license.seeAlso[0] : // Only get the first of possibly multiple URLs
				`https://spdx.org/licenses/${license.licenseId}.html`), // Handle missing seeAlso
			osiApproved: license.isOsiApproved
		};
	}

	fs.writeFileSync('spdx.json', JSON.stringify(licensesJson, null, '\t'));
	fs.writeFileSync('spdx-simple.json', JSON.stringify(Object.keys(licensesJson), null, '\t'));

	let counter = 0;

	const mapper = async license => {
		try {
			const res = await got(license.detailsUrl, {json: true});
			licensesJson[license.licenseId].licenseText = res.body.licenseText.replace(/\r\n/g, '\n').trim();
			spinner.text = `Downloaded ${++counter} of ${Object.keys(licensesJson).length} licenses`;
		} catch (err) {
			throw new Error(`Error getting URL ${license.detailsUrl}. Response is:\n${err.response.body}`);
		}
	};

	await pMap(spdx.licenses, mapper, {concurrency: MAX_CONCURRENT_CONNECTIONS});
	fs.writeFileSync('spdx-full.json', JSON.stringify(licensesJson, null, '\t'));
	spinner.succeed('Done');
})().catch(err => {
	throw new Error(`Error getting URL ${err.url}. Response is:\n${err.response.body}`);
});
