import * as test from 'tape';
import parseArguments, { splitArg, isString, controller } from './index';

test('splitArg(\'hello=world\') should be split on \'=\' and return { key: \'hello\', val: \'world\' }', t => {
	let result = splitArg('hello=world');
	let expected = {
		key: 'hello',
		val: 'world',
	};
	t.deepEqual(result, expected);
	t.end();
});

test('calling splitArg w/ \'=\' character in input string should return { key: \'malformed\', val: null }', t => {
	let result = splitArg('helloworld');
	let expected = {
		key: 'malformed',
		val: null,
	};
	t.deepEqual(result, expected);
	t.end();
});

test('calling controller w/ key not in keyMap should set isSuccessful to false', t => {
	let result = controller({ isSuccessful: true, payload: { dataset: '', filename: '' } }, 'badkey=48').isSuccessful;
	let expected = true;
	t.notEqual(result, expected);
	t.end();
});

test('run the whole parseArguments module', t => {
	let args = ['filename=slayer', 'dataset=fishbucket'];
	let result = parseArguments(args);
	let expected = {
		isSuccessful: true,
		payload: { 
     		filename: 'slayer',
     		dataset: 'fishbucket',
		},
	};
	t.deepEqual(result, expected);
	t.end();
});
