import {expectType} from 'tsd';
import * as spdxFull from '../full';

expectType<string>(spdxFull.MIT.licenseText);
expectType<string>(spdxFull.MIT.name);
expectType<boolean>(spdxFull.MIT.osiApproved);
expectType<string>(spdxFull.MIT.url);
