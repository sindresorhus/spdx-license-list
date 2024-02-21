# spdx-license-list

> List of [SPDX licenses](https://spdx.org/licenses/)

The lists of licenses are just JSON files and can be used anywhere.

- [spdx.json](spdx.json) contains just license metadata
- [spdx-full.json](spdx-full.json) includes the license text too
- [spdx-simple.json](spdx-simple.json) only contains the license IDs

*Using SPDX License List version 3.23 (2024-02-08)*

## Install

```sh
npm install spdx-license-list
```

## Usage

```js
const spdxLicenseList = require('spdx-license-list');

console.log(spdxLicenseList.MIT);
/*
{
	name: 'MIT License',
	url: 'http://www.opensource.org/licenses/MIT',
	osiApproved: true
}
*/
```

```js
const mitLicense = require('spdx-license-list/licenses/MIT');

console.log(mitLicense.licenseText);
//=> 'MIT License\r\n\r\nCopyright (c) <year> <copyright holders> …'
```

You can also get a version with the licence text included:

```js
const spdxLicenseList = require('spdx-license-list/full');

console.log(spdxLicenseList.MIT);
/*
{
	name: 'MIT License',
	url: 'http://www.opensource.org/licenses/MIT',
	osiApproved: true,
	licenseText: '…'
}
*/
```

Or just the license IDs as a `Set`:

```js
const spdxLicenseList = require('spdx-license-list/simple');

console.log(spdxLicenseList);
//=> Set {'Glide', 'Abstyles', …}
```

## API

### spdxLicenseList

Type: `object`

The licenses are indexed by their identifier and contains a `name` property with the full name of the license, `url` with the URL to the license, and `osiApproved` boolean for whether the license is [OSI Approved](https://opensource.org/licenses).
