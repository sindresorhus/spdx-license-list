/**
Object of [SPDX licenses](https://spdx.org/licenses/) indexed by their identifiers and including the full license text.

@example
```
import * as spdxFull from 'spdx-license-list/full';

console.log(spdxFull.MIT);
//=> {
//=> 	name: 'MIT License',
//=> 	url: 'http://www.opensource.org/licenses/MIT',
//=> 	osiApproved: true,
//=>	licenseText: 'MIT License…'
//=> }
```
*/
declare const spdxLicenseListFull: Readonly<Record<string, {
	/**
	Name of the license.
	*/
	readonly name: string;

	/**
	URL where the license can be downloaded.
	*/
	readonly url: string;

	/**
	Whether the license is OSI approved.
	*/
	readonly osiApproved: boolean;

	/**
	Full license text.
	*/
	readonly licenseText: string;
}>>;

export = spdxLicenseListFull;
