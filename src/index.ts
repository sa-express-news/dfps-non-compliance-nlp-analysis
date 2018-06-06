#! /usr/bin/env node

import getData 				from './getData';
import trainClassifier 		from './trainClassifier';
import classifyData			from './classifyData';
import writeToCSVAndPush	from './writeToCSVAndPush';

// interfaces
import { Incident, IncidentWithClassification } from './interfaces';

export const sheet 				= 'non_compliance_master';
export const dataset 			= 'dfps-cpainvestigations-data';
export const filename			= 'NLP-Non-Compliance-Abuse-Cases';

export const getWhereClauseList	= () => ([
	{
		column: 'programs_provided',
		value: 'Child Placing Agency',
		isEquals: true,
	},
	{
		column: 'programs_provided',
		value: 'Residential Treatment Center',
		isEquals: true,
	},
	{
		column: 'programs_provided',
		value: 'Multiple Services',
		isEquals: true,
	},
	{
		column: 'programs_provided',
		value: 'Couldn\'t find programs',
		isEquals: true,
	},
]);

const run = async () => {
	const data: any = await getData(dataset, sheet, getWhereClauseList());
	console.log('loaded!');

	const classifier = trainClassifier(data);
	console.log('trained!');

	const result: Array<IncidentWithClassification> = classifyData(data, classifier);
	console.log('classified!');

	await writeToCSVAndPush(result, filename, dataset);
	console.log('Success!');
};
run().catch(err => console.error(err));
