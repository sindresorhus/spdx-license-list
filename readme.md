# spdx-license-list [![Build Status](https://travis-ci.org/sindresorhus/spdx-license-list.svg?branch=master)](https://travis-ci.org/sindresorhus/spdx-license-list)

> List of [SPDX licenses](http://spdx.org/licenses/)

The lists of licenses are two JSON files and can be used wherever.

-	[spdx.json](spdx.json) contains just relative url to the license.
-	[spdx-full.json](spdx-full.json) contains full license content.

*Using SPDX License List version 1.20.*


## Install

```sh
$ npm install --save spdx-license-list
```


## Usage

```js
var spdxLicenseList = require('spdx-license-list');

console.log(spdxLicenseList.MIT);
//=> { name: 'MIT License', osiApproved: true }
```


## API

### spdxLicenseList

Type: `object`

The licenses are indexed by their identifier and contains a `name` property with the full name of the license, `osiApproved` boolean for whether the license is [OSI Approved](http://opensource.org/licenses) and `license` for full license content.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
