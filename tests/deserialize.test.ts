import deserialize from '../src/deserializing/deserialize';
import { CIRCLE_OPTIONS, STANDARD_HASH } from './constants';

describe('Deserialize Hash', () => {
	test('Deserialize normal hash', () => {
		const circleOptions = deserialize(STANDARD_HASH);

		expect(circleOptions).toEqual(CIRCLE_OPTIONS);
	});
});