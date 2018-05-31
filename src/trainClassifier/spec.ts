import * as test 	from 'tape';

import { 
	combineTokens,
	buildTrainingTest
} from './index';

test('combineTokens: tokens are combined as into unique set', t => {
	const combinedTokens = new Set(['hello', 'i', 'love', 'puppi', 'don', 't', 'forget', 'it']);
	const stems = ['hello', 'my', 'name', 'is', 'lucrecio', 'don', 't', 'mispronounc', 'it'];
	combineTokens(stems, combinedTokens);
	let result = [...combinedTokens]
	let expected = ['hello', 'i', 'love', 'puppi', 'don', 't', 'forget', 'it', 'my', 'name', 'is', 'lucrecio', 'mispronounc'];
	t.deepEqual(result, expected);
	t.end();
});

test('buildTrainingTest: returns deep match of expected object', t => {
	const combinedTokens = new Set(['hello', 'i', 'love', 'puppi', 'don', 't', 'forget', 'it', 'my', 'name', 'is', 'lucrecio', 'mispronounc']);
	const stems = ['hello', 'don', 'it'];
	const outputType = 'nonAbuse';

	let result = buildTrainingTest(stems, combinedTokens, outputType);
	let expected = {
		input: [1,0,0,0,1,0,0,1,0,0,0,0,0],
		output: {
			nonAbuse: 1,
		},
	};
	t.deepEqual(result, expected);
	t.end();
});
