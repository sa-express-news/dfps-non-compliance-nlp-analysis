import * as natural from 'natural';

// interfaces
import { Incident } from '../interfaces';

import { abuseTestIDs, nonAbuseTestIDs } from '../testIDs';

const addToLibrary = (classifier: any, narrative: string, answer: string) => classifier.addDocument(narrative, answer);

const tokenizeString = ((narrative: string, tokenizer: any) => tokenizer.tokenize(narrative));

const getStems = (words: Array<string>) => words.map((word: string) => natural.PorterStemmer.stem(word));

const combineTokens = (stems: Array<string>, tokens: Set<string>) => stems.forEach((stem: string) => tokens.add(stem));

export default (data: Array<Incident>) =>  {
	const tokenizer = new natural.WordTokenizer();
	const tokens	= new Set();
	data.forEach((incident: Incident) => {
		const { non_compliance_id, narrative } = incident;
		if (abuseTestIDs.has(non_compliance_id)) {
			const words = tokenizeString(narrative, tokenizer);
			const stems = getStems(words);
			combineTokens(stems, tokens);
		} else if (nonAbuseTestIDs.has(non_compliance_id)) {
			//addToLibrary(classifier, narrative, 'notabuse');
		}
	});
	console.log(tokens);
}