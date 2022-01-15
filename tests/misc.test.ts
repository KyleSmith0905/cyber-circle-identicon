import { OverrideOptions } from '../src/interface';
import { fillIncompleteOptions, overrideData } from '../src/utils';
import { CALCULATED_CIRCLE_OPTIONS, ADDITIONAL_OPTIONS } from './constants';

describe('Miscellaneous', () => {
	test('Fill incomplete options', () => {
		const circleOptions = {};
		
		fillIncompleteOptions(circleOptions);
		
		ADDITIONAL_OPTIONS.smoothEdges = 2;
		expect(circleOptions).toEqual(ADDITIONAL_OPTIONS);
	});

	test('Fill incomplete options with hash', () => {
		const overrideCircleOptions: OverrideOptions = {
			backgroundColors: {
				start: { r: 254, g: 1, b: 244 },
			},
			elements: [
				{ x: 0, y: 0, r: 0.5 },
			],
		};

		overrideData(CALCULATED_CIRCLE_OPTIONS, overrideCircleOptions);

		const FINAL_CIRCLE_OPTIONS = {
			foregroundColors: {
				start: { r: 176, g: 144, b: 64 },
				end: { r: 208, g: 32, b: 112 },
				rotation: 1.5707963267948966
			},
			backgroundColors: {
				start: { r: 254, g: 1, b: 244 },
				end: { r: 48, g: 64, b: 208 },
				rotation: 2.748893571891069
			},
			elements: [ { x: 0, y: 0, r: 0.5 } ]
		};

		expect(CALCULATED_CIRCLE_OPTIONS).toEqual(FINAL_CIRCLE_OPTIONS);
	});
});