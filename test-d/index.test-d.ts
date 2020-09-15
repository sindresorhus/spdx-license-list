import {expectType} from 'tsd';
import * as spdx from '../';

expectType<string>(spdx.MIT.name);
expectType<boolean>(spdx.MIT.osiApproved);
expectType<string>(spdx.MIT.url);
