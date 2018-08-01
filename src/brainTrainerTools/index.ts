import * as natural from 'natural';

export const tokenizeString = (narrative: string, tokenizer: any) => tokenizer.tokenize(narrative);

export const getStems = (words: Array<string>) => words.map((word: string) => natural.PorterStemmer.stem(word));

export const buildBrainInput = (stems: Array<string>, combinedTokens: Set<string>) => {
	const stemSet = new Set(stems);
	return Array.from(combinedTokens.values()).map((token: string) => {
		return stemSet.has(token) ? 1 : 0;
	});
};