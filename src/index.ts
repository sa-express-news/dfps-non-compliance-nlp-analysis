#! /usr/bin/env node

import getData 			from './getData';
import trainClassifier 	from './trainClassifier';
import classifyData		from './classifyData';

// interfaces
import { Incident, IncidentWithClassification } from './interfaces';

export const sheet 				= 'non_compliance_master';
export const dataset 			= 'dfps-cpainvestigations-data';
export const filename			= 'Non-Compliance-Abuse-Cases';
export const sqlFilterColumn	= 'programs_provided';
export const sqlFilters 		= ['Child Placing Agency', 'Residential Treatment Center', 'Multiple Services', 'Couldn\'t find programs'];

const run = async () => {
	const data: any 								= await getData(dataset, sheet, sqlFilterColumn, sqlFilters);
	console.log('loaded!')
	const classifier: any 							= trainClassifier(data);
	// console.log('trained!')
	// const result: Array<IncidentWithClassification> = classifyData(data, classifier);
	// console.log(result);
};
run();
