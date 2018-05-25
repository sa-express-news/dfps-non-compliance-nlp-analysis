require('dotenv').config();

import * as rp from 'request-promise';

// interfaces
import { Incident, WhereClause } from '../interfaces';

const apiKey = process.env.DW_API_KEY;

export const buildWhereClause = (sheet: string, whereClauseList: Array<WhereClause>) => whereClauseList.reduce((clause: string, hash: WhereClause, idx: number) => {
	const operator 	= hash.isEquals ? '=' : '!=';
	const condition = idx === 0 ? 'WHERE' : ' OR';
	return clause += `${condition} ${sheet}.${hash.column} ${operator} "${hash.value}"`;
}, '');

export const getSQLQuery = (sheet: string, whereClauseList: Array<WhereClause>) => encodeURIComponent(`SELECT * FROM ${sheet} ${buildWhereClause(sheet, whereClauseList)}`);

const setConfigObj = (dataset: string, sheet: string, whereClauseList: Array<WhereClause>) => ({
	uri: `https://api.data.world/v0/sql/expressnews/${dataset}?query=${getSQLQuery(sheet, whereClauseList)}`,
	headers: {
		'Authorization': `Bearer ${apiKey}`,
		'Accept': 'application/json',
	},
	json: true,
});

export const getSheet = (dataset: string, sheet: string, whereClauseList: Array<WhereClause>) => rp(setConfigObj(dataset, sheet, whereClauseList))
				.then((res: Array<Incident>) => res)
				.catch((err: any) => console.error(err));

export default async (dataset: string, sheet: string, whereClauseList: Array<WhereClause>) => await getSheet(dataset, sheet, whereClauseList);
