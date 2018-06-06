import * as natural from 'natural';

import { Incident } from '../interfaces';

export const classifyNarratve = (incident: Incident, narrative: string, classifier: any) => {
	return Object.assign({}, incident, { classification: narrative ? classifier.classify(narrative) : null });
}

export default (data: Array<Incident>, classifier: any) => {
	return data.map((incident: Incident) => {
		return classifyNarratve(incident, incident.narrative, classifier);
	});
}