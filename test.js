import test from 'ava';
import spdxLicenseList from '.';

test('main', t => {
	t.is(spdxLicenseList.MIT.name, 'MIT License');
	t.is(spdxLicenseList.MIT.url, 'https://opensource.org/licenses/MIT');
	t.true(require('./full').MIT.licenseText.length > 0);
	t.true(require('./simple').has('MIT'));
	t.is(require('./licenses/MIT').name, 'MIT License');
});
