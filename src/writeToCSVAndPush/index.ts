require('dotenv').config();

import * as rp from 'request-promise';
import * as fs from 'fs';
import * as csv from 'csv';

// interfaces
import { IncidentWithClassification } from '../interfaces';

const apiKey = process.env.DW_API_KEY;

/*
 * Push the outpus CSV to data.world
 */

const setPOSTConfigObj = (filename: string, dataset: string) => ({
	method: 'POST',
	uri: `https://api.data.world/v0/uploads/expressnews/${dataset}/files?expandArchives=false`,
	formData: {
		file: {
			name: filename,
			value: fs.createReadStream(`./results/${filename}.csv`),
			options: {
				filename: `./${filename}.csv`,
				contentType: 'text/csv',
			},
		}, 
	},
	headers: {
		'Authorization': `Bearer ${apiKey}`,
	},
});

const pushSyncedData = (filename: string, dataset: string) => rp(setPOSTConfigObj(filename, dataset));

/*
 * Generate a CSV file from the array of objects and push it to data.world
 */

 const setStringifyOptions = () => ({
 	header: true,
 	formatters: {
 		bool: bool => bool ? '1' : '0',
 	},
 });

export default (master: Array<IncidentWithClassification>, filename: string, dataset: string) => {
	csv.stringify(master, setStringifyOptions(), (err, output) => {
		if (err) console.error(err);
		fs.writeFile(`./results/${filename}.csv`, output, async error => {
			if (error) console.error(error);
			else {
				console.log('Pushing to data.world');
				await pushSyncedData(filename, dataset).catch(err => console.error(err));
			};
		});
	});
};
