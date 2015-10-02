# spdx-license-list [![Build Status](https://travis-ci.org/sindresorhus/spdx-license-list.svg?branch=master)](https://travis-ci.org/sindresorhus/spdx-license-list)

> List of [SPDX licenses](http://spdx.org/licenses/)

The lists of licenses are two JSON files and can be used wherever.

-	[spdx.json](spdx.json) contains just license metadata, license content can be found in `licenses` folder with the same name.
-	[spdx-full.json](spdx-full.json) includes the license text too.

*Using SPDX License List version 2.0.*


## Install

```
$ npm install --save spdx-license-list
```


## Usage

```js
var spdxLicenseList = require('spdx-license-list');

console.log(spdxLicenseList.MIT);
/*
{
	name: 'MIT License',
	url: 'http://www.opensource.org/licenses/MIT',
	osiApproved: true
}
*/

// you can also get a version with the licence text included
var spdxLicenseList2 = require('spdx-license-list/spdx-full');

console.log(spdxLicenseList2.MIT);
/*
{
	name: 'MIT License',
	url: 'http://www.opensource.org/licenses/MIT',
	osiApproved: true,
	license: '...'
}
*/
```


## API

### spdxLicenseList

Type: `object`

The licenses are indexed by their identifier and contains a `name` property with the full name of the license, `url` with the URL to the license, and `osiApproved` boolean for whether the license is [OSI Approved](http://opensource.org/licenses).


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
