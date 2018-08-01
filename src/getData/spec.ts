import * as test 	from 'tape';

import { getSQLQuery } from './index';

test('getSQLQuery: Full SQL query is formatted correctly', async t => {
	let result = await getSQLQuery();
	let expected = encodeURIComponent("SELECT * FROM hhsc_deficency_data AS nc WHERE (nc.programs_provided = 'Child Placing Agency' OR nc.programs_provided = 'Residential Treatment Center' OR nc.programs_provided = 'Multiple Services')");
	t.equal(result, expected);
	t.end();
});