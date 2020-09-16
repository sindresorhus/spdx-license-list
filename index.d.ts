/**
Object containing [SPDX licenses](https://spdx.org/licenses/) indexed by their identifiers.

@example
```
import * as spdx from 'spdx-license-list';

console.log(spdx.MIT);
//=> {
//=> 	name: 'MIT License',
//=> 	url: 'http://www.opensource.org/licenses/MIT',
//=> 	osiApproved: true
//=> }
```
*/
declare const spdxLicenseList: Readonly<Record<string, {
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
}>>;

export = spdxLicenseList;
