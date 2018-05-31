import * as natural from 'natural';

import { getStems, tokenizeString, buildBrainInput } from '../brainTrainerTools';

import { Incident, IncidentWithClassification, Classifier } from '../interfaces';

const getEmptyClassification = () => ({
	abuse: 0,
	nonAbuse: 0,
});

export const classifyNarratve = (narrative: string, tokenizer: any, classifier: Classifier) => {
	if (narrative) {
		const stems: Array<string> = getStems(tokenizeString(narrative, tokenizer));
		return classifier.net.run(buildBrainInput(stems, classifier.combinedTokens));
	} else {
		return getEmptyClassification();
	}
}

export default (data: Array<Incident>, classifier: Classifier) => {
	const tokenizer: any = new natural.WordTokenizer();
	return data.map((incident: Incident) => {
		const classification = classifyNarratve(incident.narrative, tokenizer, classifier);
		return Object.assign({}, incident, { classification: classification.abuse.toFixed(6) });
	});
}