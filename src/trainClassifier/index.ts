import * as natural from 'natural';

// interfaces
import { Incident } from '../interfaces';

import { abuseTestIDs, nonAbuseTestIDs } from '../testIDs';

export default (data: Array<Incident>) => {
	const classifier = new natural.BayesClassifier();

	data.forEach((incident: Incident) => {
		const { non_compliance_id, narrative } = incident;

		if (abuseTestIDs.has(non_compliance_id)) {
			classifier.addDocument(narrative, 'abuse');
		} else if (nonAbuseTestIDs.has(non_compliance_id)) {
			classifier.addDocument(narrative, 'nonabuse');
		}
	});

	classifier.train();

	return classifier;
}
