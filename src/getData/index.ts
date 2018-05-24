require('dotenv').config();

import * as rp from 'request-promise';

// interfaces
import { Incident } from '../interfaces';

const apiKey = process.env.DW_API_KEY;

const buildWhereClause = (sheet: string, sqlFilterColumn: string, sqlFilters: Array<string>) => sqlFilters.reduce((clause: string, filter: string, idx: number) => {
	const operator 	= (idx === 0) ? 'WHERE ' : ' OR ';
	const operation = `${sheet}.${sqlFilterColumn} = "${filter}"`;
	return clause += operator + operation;
}, '');

const getSQLQuery = (sheet: string, sqlFilterColumn: string, sqlFilters: Array<string>) => encodeURIComponent(`SELECT * FROM ${sheet} ${buildWhereClause(sheet, sqlFilterColumn, sqlFilters)}`);

const setConfigObj = (dataset: string, sheet: string, sqlFilterColumn: string, sqlFilters: Array<string>) => ({
	uri: `https://api.data.world/v0/sql/expressnews/${dataset}?query=${getSQLQuery(sheet, sqlFilterColumn, sqlFilters)}`,
	headers: {
		'Authorization': `Bearer ${apiKey}`,
		'Accept': 'application/json',
	},
	json: true,
});

export const getSheet = (dataset: string, sheet: string, sqlFilterColumn: string, sqlFilters: Array<string>) => rp(setConfigObj(dataset, sheet, sqlFilterColumn, sqlFilters))
				.then((res: Array<Incident>) => res)
				.catch((err: any) => console.error(err));

export default async (dataset: string, sheet: string, sqlFilterColumn: string, sqlFilters: Array<string>) => await getSheet(dataset, sheet, sqlFilterColumn, sqlFilters);
