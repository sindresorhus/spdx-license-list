import test from 'ava';
import m from '.';

test('main', t => {
	t.is(m.MIT.name, 'MIT License');
	t.is(m.MIT.url, 'http://www.opensource.org/licenses/MIT');
	t.true(require('./full').MIT.licenseText.length > 0);
	t.true(require('./simple').has('MIT'));
	t.is(require(`./licenses/MIT`).licenseId, 'MIT');
});
