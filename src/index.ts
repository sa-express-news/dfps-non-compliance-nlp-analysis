#! /usr/bin/env node

import parseArguments		from './parseArguments';
import getData 				from './getData';
import trainClassifier 		from './trainClassifier';
import classifyData			from './classifyData';
import writeToCSVAndPush	from './writeToCSVAndPush';

// interfaces
import { Incident, IncidentWithClassification } from './interfaces';

const run = async () => {
	const parsedArguments = parseArguments(process.argv.slice(2));

	if (parsedArguments.isSuccessful) {
		const { dataset, filename } = parsedArguments.payload;

		const data: any = await getData(dataset);
		console.log('loaded!');

		const classifier = await trainClassifier(data);
		console.log('trained!');

		const result: Array<IncidentWithClassification> = classifyData(data, classifier);
		console.log('classified!');

		console.log(result.filter(incident => incident.classification === 'abuse'));

		// await writeToCSVAndPush(result, filename, dataset);
		// console.log('Success!');
	} else {
		console.error('Malformed arguments passed to processor');
	}
};
run().catch(err => console.error(err));
