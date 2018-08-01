import * as _ from 'lodash';

// interfaces
import { ParsedArguments } from '../interfaces';

// this hash maps each argument key to a function
// that should be applied to the corresponding value
const keyMap = {
    filename: (val: string, key: string) => isString(val),
    dataset: (val: string, key: string) => isString(val),
};

export const isString = (val: any): string => typeof val === 'string' ? val : 'err';

// splitArg takes each input arg and splits it on '=' into { key: '', val: '' }
export const splitArg = (arg: string) => {
	if (arg.indexOf('=') === -1) {
		console.error(`Argument ${arg} is improperly formatted`);
		return { key: 'malformed', val: null };
	}
	const pair = arg.split('=');
	return { key: pair[0], val: pair[1] };
};

// controller manages the parsing of each argument
export const controller = (result: ParsedArguments, arg: string): ParsedArguments => {
	const { key, val } = splitArg(arg);
	if (!result.isSuccessful || !keyMap[key]) {
		result.isSuccessful = false;
	} else {
		result.payload[key] = keyMap[key](val, key);
		result.isSuccessful = result.payload[key] !== 'err';
	}
	return result;
};

export default (args: Array<string>) => args.reduce(controller, { isSuccessful: true, payload: { dataset: '', filename: '' }  });