import * as natural from 'natural';
import * as fs 		from 'fs';

import { getStems, tokenizeString, buildBrainInput } from '../brainTrainerTools';

// interfaces
import { Incident } from '../interfaces';

import { corporalTestIDs, improperRestraintTestIDs } from '../testIDs';

export const combineTokens = (stems: Array<string>, tokens: Set<string>) => stems.forEach((stem: string) => tokens.add(stem));

export const buildNewClassifier = (data: Array<Incident>) => {
	const classifier = new natural.BayesClassifier();
	const tokenizer: any = new natural.WordTokenizer();
	const combinedTokens: Set<string> = new Set();

	data.forEach((incident: Incident) => {
		const { uniq_id, narrative } = incident;

		if (corporalTestIDs.has(uniq_id)) {
			const stems: Array<string> = getStems(tokenizeString(narrative, tokenizer));
			classifier.addDocument(stems, 'abuse');
		} else if (improperRestraintTestIDs.has(uniq_id)) {
			const stems: Array<string> = getStems(tokenizeString(narrative, tokenizer));
			classifier.addDocument(stems, 'nonabuse');
		}
	});

	classifier.train();

	fs.writeFileSync('./classifier.json', JSON.stringify(classifier));

	return classifier;
};

export const restoreClassifier = (raw: any) => {
	return natural.BayesClassifier.restore(JSON.parse(raw));
}

export const getClassifier = (data: Array<Incident>) => new Promise((resolve: any, reject: any) => {
	if (!fs.existsSync('./classifier.json')) {
		resolve(buildNewClassifier(data));
	} else {
		fs.readFile('./classifier.json', (err: any, raw: any) => {
			if (err) reject(err);
			resolve(restoreClassifier(raw));
		});
	}
});

export default async (data: Array<Incident>) => {
	return await getClassifier(data);
}
