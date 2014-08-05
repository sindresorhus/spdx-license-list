# spdx-license-list [![Build Status](https://travis-ci.org/sindresorhus/spdx-license-list.svg?branch=master)](https://travis-ci.org/sindresorhus/spdx-license-list)

> List of [SPDX licenses](http://spdx.org/licenses/)

The list of licenses is just a [JSON file](spdx.json) and can be used wherever.

*Using SPDX License List version 1.19.*


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

The licenses are indexed by their identifier and contains a `name` property with the full name of the license and a `osiApproved` boolean for whether the license is [OSI Approved](http://opensource.org/licenses).


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
