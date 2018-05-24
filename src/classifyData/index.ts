import { Incident, IncidentWithClassification } from '../interfaces';

export default (data: Array<Incident>, classifier: any) => data.map((incident: Incident) => {
	const classification = incident.narrative ? classifier.classify(incident.narrative) : '';
	return Object.assign({}, incident, { classification });
});