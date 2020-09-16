/**
Set of the identifiers of [SPDX licenses](https://spdx.org/licenses/).

@example
```
import * as spdxSimple from 'spdx-license-list/simple';

console.log(spdxSimple);
//=> Set {'0BSD', 'AAL', …}
```
*/
declare const spdxLicenseListSimple: Readonly<Set<string>>;

export = spdxLicenseListSimple;
