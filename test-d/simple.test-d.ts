import {expectType} from 'tsd';
import * as spdxSimple from '../simple';

expectType<Readonly<Set<string>>>(spdxSimple);
