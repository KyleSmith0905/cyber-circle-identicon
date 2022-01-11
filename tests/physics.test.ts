import setElements from '../src/physics';
import { CALCULATED_CIRCLE_ELEMENTS, CIRCLE_ELEMENTS } from './constants';

describe('Circle Element Physics', () => {
	test('Physics on standard input', () => {
		const elements = setElements(CIRCLE_ELEMENTS);
		
		expect(elements).toEqual(CALCULATED_CIRCLE_ELEMENTS);
	});
});