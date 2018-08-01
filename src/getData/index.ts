require('dotenv').config();

import * as rp from 'request-promise';
import * as fs from 'fs';

// interfaces
import { Incident, SqlQuery } from '../interfaces';

const apiKey = process.env.DW_API_KEY;

export const getSQLQuery = (): Promise<string> => new Promise((resolve: any, reject: any) => {
	fs.readFile('./sqlQuery.json', (err: any, raw: any) => {
		if (err) reject(err);
		const { query } = JSON.parse(raw)
		resolve(encodeURIComponent(query));
	});
});

const setConfigObj = (dataset: string, sqlQuery: string) => ({
	uri: `https://api.data.world/v0/sql/expressnews/${dataset}?query=${sqlQuery}`,
	headers: {
		'Authorization': `Bearer ${apiKey}`,
		'Accept': 'application/json',
	},
	json: true,
});

export const getSheet = (dataset: string, sqlQuery: string) => rp(setConfigObj(dataset, sqlQuery))
				.then((res: Array<Incident>) => res)
				.catch((err: any) => console.error(err));

export default async (dataset: string) => {
	const sqlQuery: string = await getSQLQuery();
	return await getSheet(dataset, sqlQuery);
}
