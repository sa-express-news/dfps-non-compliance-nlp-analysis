import * as natural from 'natural';

import { getStems, tokenizeString, buildBrainInput } from '../brainTrainerTools';

import { improperRestraintIDs } from '../testIDs';

import { Incident } from '../interfaces';

export const classifyNarratve = (incident: Incident, narrative: string, tokenizer: any, classifier: any) => {
	const stems: Array<string> = getStems(tokenizeString(narrative, tokenizer));
	return Object.assign({}, incident, { classification: narrative ? classifier.classify(stems) : null });
}

export const getTarget = (incident: Incident) => {
	const target = improperRestraintIDs;
	return target.has(incident.uniq_id);
};

export default (data: Array<Incident>, classifier: any) => {
	const tokenizer: any = new natural.WordTokenizer();
	return data.filter(getTarget).map((incident: Incident) => {
		return classifyNarratve(incident, incident.narrative, tokenizer, classifier);
	});
}