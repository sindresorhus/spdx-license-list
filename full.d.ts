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
declare const SpdxLicenseListFull: Readonly<Record<string, {
	/**
	Common, textual name of the license.
	*/
	readonly name: string;

	/**
	URL where the license can be downloaded.
	*/
	readonly url: string;

	/**
	`true` if the license is OSI approved, `false` otherwise.
	*/
	readonly osiApproved: boolean;

	/**
	Full license text.
	*/
	readonly licenseText: string;
}>>;

export = SpdxLicenseListFull;
