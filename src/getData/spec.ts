import * as test 	from 'tape';

import { buildWhereClause, getSQLQuery } from './index';

export const sheet = 'non_compliance_master';

const getWhereClauseList = () => ([
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

const whereClauseMock = 'WHERE non_compliance_master.programs_provided = "Child Placing Agency" OR non_compliance_master.programs_provided = "Residential Treatment Center" OR non_compliance_master.programs_provided = "Multiple Services" OR non_compliance_master.programs_provided = "Couldn\'t find programs"';

test('buildWhereClause: WHERE clause is formatted in proper SQL syntax', t => {
	let result = buildWhereClause(sheet, getWhereClauseList());
	let expected = whereClauseMock;
	t.equal(result, expected);
	t.end();
});

test('getSQLQuery: Full SQL query is formatted correctly', t => {
	let result = getSQLQuery(sheet, getWhereClauseList());
	let expected = encodeURIComponent(`SELECT * FROM non_compliance_master ${whereClauseMock}`);
	t.equal(result, expected);
	t.end();
});