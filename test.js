import test from 'ava';
import m from '.';

test(t => {
	t.is(m.MIT.name, 'MIT License');
	t.is(m.MIT.url, 'http://www.opensource.org/licenses/MIT');
	t.true(require('./full').MIT.licenseText.length > 0);
	t.true(require('./simple').indexOf('MIT') !== -1);
	t.is(require(`./licenses/MIT`).licenseId, 'MIT');
});
