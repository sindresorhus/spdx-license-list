/**
Object containing [SPDX licenses](https://spdx.org/licenses/) indexed by their identifiers.

@example
```
import * as spdx from "spdx-license-list";
console.log(spdx.MIT);
//=> {
//=> 	name: 'MIT License',
//=> 	url: 'http://www.opensource.org/licenses/MIT',
//=> 	osiApproved: true
//=> }
```
*/
declare const SpdxLicenseList: Readonly<Record<string, {
	/** Common, textual name of license. */
	readonly name: string;

	/** URL where license can be downloaded. */
	readonly url: string;

	/** Value is `true` if license is OSI approved, `false` otherwise. */
	readonly osiApproved: boolean;
}>>;

export = SpdxLicenseList;
