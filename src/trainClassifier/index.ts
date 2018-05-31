import * as natural from 'natural';
import * as brain	from 'brain.js';

import { getStems, tokenizeString, buildBrainInput } from '../brainTrainerTools';

// interfaces
import { Incident, TrainingLists, TrainingTest } from '../interfaces';

import { abuseTestIDs, nonAbuseTestIDs } from '../testIDs';

export const combineTokens = (stems: Array<string>, tokens: Set<string>) => stems.forEach((stem: string) => tokens.add(stem));

export const buildTrainingTest = (stems: Array<string>, combinedTokens: Set<string>, outputType: string) => ({
	input: buildBrainInput(stems, combinedTokens),
	output: { [outputType]: 1 },
});

export default (data: Array<Incident>) =>  {
	const tokenizer: any 					= new natural.WordTokenizer();
	const combinedTokens: Set<string> 		= new Set();
	const trainingLists: TrainingLists		= { abuse: [], nonAbuse: [] };

	data.forEach((incident: Incident) => {
		const { non_compliance_id, narrative } = incident;

		if (abuseTestIDs.has(non_compliance_id)) {
			const stems: Array<string> = getStems(tokenizeString(narrative, tokenizer));
			combineTokens(stems, combinedTokens);
			trainingLists.abuse.push(stems);
		} else if (nonAbuseTestIDs.has(non_compliance_id)) {
			const stems: Array<string> = getStems(tokenizeString(narrative, tokenizer));
			combineTokens(stems, combinedTokens);
			trainingLists.nonAbuse.push(stems);
		}
	});

	const trainingTests: Array<TrainingTest> = [];

	['abuse', 'nonAbuse'].forEach((listKey: string) => {
		trainingLists[listKey].forEach((stems: Array<string>) => {
			trainingTests.push(buildTrainingTest(stems, combinedTokens, listKey));
		});
	});

	const net = new brain.NeuralNetwork();
	net.train(trainingTests);

	return {
		net,
		combinedTokens,
	};
}