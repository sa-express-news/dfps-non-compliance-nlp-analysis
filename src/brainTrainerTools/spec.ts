import * as test 	from 'tape';
import * as natural from 'natural';

import { 
	tokenizeString,
	getStems,
	buildBrainInput,
} from './index';

test('tokenizeString: string is properly tokenized', t => {
	const string 	= 'Hello my name is Lucrecio, don\'t mispronounce it.';
	const tokenizer = new natural.WordTokenizer();
	let result = tokenizeString(string, tokenizer);
	let expected = ['Hello', 'my', 'name', 'is', 'Lucrecio', 'don', 't', 'mispronounce', 'it'];
	t.deepEqual(result, expected);
	t.end();
});

test('getStems: tokens are stemmed as anticipated', t => {
	const tokens = ['Hello', 'my', 'name', 'is', 'Lucrecio', 'don', 't', 'mispronounce', 'it'];
	let result = getStems(tokens);
	let expected = ['hello', 'my', 'name', 'is', 'lucrecio', 'don', 't', 'mispronounc', 'it'];
	t.deepEqual(result, expected);
	t.end();
});

test('buildBrainInput: array of stems maps to expected binary, numerical array', t => {
	const combinedTokens = new Set(['hello', 'i', 'love', 'puppi', 'don', 't', 'forget', 'it', 'my', 'name', 'is', 'lucrecio', 'mispronounc']);
	const test1 = ['hello', 'don', 'it'];
	const test2 = ['forget', 'it', 'my', 'name', 'is', 'lucrecio'];

	let result = buildBrainInput(test1, combinedTokens);
	let expected = [1,0,0,0,1,0,0,1,0,0,0,0,0];
	t.deepEqual(result, expected);

	result = buildBrainInput(test2, combinedTokens);
	expected = [0,0,0,0,0,0,1,1,1,1,1,1,0];
	t.deepEqual(result, expected);
	t.end();
});
