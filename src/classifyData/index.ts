import * as natural from 'natural';

import { tokenizeString, getStems, buildBrainInput } from '../trainClassifier';

import { Incident, IncidentWithClassification, Classifier } from '../interfaces';

export default (data: Array<Incident>, classifier: Classifier) => {
	const tokenizer: any = new natural.WordTokenizer();
	return data.map((incident: Incident) => {
		let classification = { abuse: null, nonAbuse: null };
		if (incident.narrative) {
			const stems: Array<string> = getStems(tokenizeString(incident.narrative, tokenizer));
			classification = classifier.net.run(buildBrainInput(stems, classifier.combinedTokens));
		}
		return Object.assign({}, incident, { classification });
	});
}