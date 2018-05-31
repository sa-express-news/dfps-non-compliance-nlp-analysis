#! /usr/bin/env node

import getData 				from './getData';
import trainClassifier 		from './trainClassifier';
import classifyData			from './classifyData';
import writeToCSVAndPush	from './writeToCSVAndPush';

// interfaces
import { Incident, IncidentWithClassification, Classifier } from './interfaces';

export const sheet 				= 'non_compliance_master';
export const dataset 			= 'dfps-cpainvestigations-data';
export const filename			= 'Non-Compliance-Abuse-Cases';

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

	const classifier: Classifier = trainClassifier(data);
	console.log('trained!');

	const result = classifyData(data, classifier);
	console.log('analyzed!');

	await writeToCSVAndPush(result, filename, dataset);
	console.log('Success!');

	console.log(...classifier.combinedTokens);
	
	// let abuseMap = {
	// 	over90: [],
	// 	over80: [],
	// 	over70: [],
	// 	over60: [],
	// 	over50: [],
	// 	over40: [],
	// 	over30: [],
	// 	over20: [],
	// 	over10: [],
	// 	over0: [],
	// };

	// result.forEach((incident: IncidentWithClassification) => {
	// 	let c = incident.classification;
	// 	if (c.abuse >= 0.9) {
	// 		abuseMap.over90.push(incident.non_compliance_id + ': ' + incident.narrative);
	// 	} else if (c.abuse >= 0.8 && c.abuse < 0.9) {
	// 		abuseMap.over80.push(incident.non_compliance_id + ': ' + incident.narrative);
	// 	} else if (c.abuse >= 0.7 && c.abuse < 0.8) {
	// 		abuseMap.over70.push(incident.non_compliance_id + ': ' + incident.narrative);
	// 	} else if (c.abuse >= 0.6 && c.abuse < 0.7) {
	// 		abuseMap.over60.push(incident.non_compliance_id + ': ' + incident.narrative);
	// 	} else if (c.abuse >= 0.5 && c.abuse < 0.6) {
	// 		abuseMap.over50.push(incident.non_compliance_id + ': ' + incident.narrative);
	// 	} else if (c.abuse >= 0.4 && c.abuse < 0.5) {
	// 		abuseMap.over40.push(incident.non_compliance_id + ': ' + incident.narrative);
	// 	} else if (c.abuse >= 0.3 && c.abuse < 0.4) {
	// 		abuseMap.over30.push(incident.non_compliance_id + ': ' + incident.narrative);
	// 	} else if (c.abuse >= 0.2 && c.abuse < 0.3) {
	// 		abuseMap.over20.push(incident.non_compliance_id + ': ' + incident.narrative);
	// 	} else if (c.abuse >= 0.1 && c.abuse < 0.2) {
	// 		abuseMap.over10.push(incident.non_compliance_id + ': ' + incident.narrative);
	// 	} else if (c.abuse < 0.1) {
	// 		abuseMap.over0.push(incident.non_compliance_id + ': ' + incident.narrative);
	// 	}
	// });

	// function printRes (arr) {
	// 	for (let i = 0; i < 20; i++) {
	// 		console.log(arr[i]);
	// 	}
	// }

	// console.log(abuseMap.over90.length, abuseMap.over80.length, abuseMap.over70.length, abuseMap.over60.length, abuseMap.over50.length, abuseMap.over40.length, abuseMap.over30.length, abuseMap.over20.length, abuseMap.over10.length, abuseMap.over0.length)

	// console.log('80s')
	// printRes(abuseMap.over80);
	// console.log('70s')
	// printRes(abuseMap.over70);
	// console.log('60s')
	// printRes(abuseMap.over60);
};
run();
