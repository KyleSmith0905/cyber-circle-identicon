import renderImage from '../src/render';
import { ADDITIONAL_OPTIONS, CALCULATED_CIRCLE_OPTIONS } from './constants';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';

describe('Render Circle', () => {
	test('Render small image', () => {
		const renderedImage = renderImage(CALCULATED_CIRCLE_OPTIONS, ADDITIONAL_OPTIONS);
		
		expect(renderedImage).toEqual(readFileSync(join(resolve(), '/tests/assets/output-1.png')));
	});
});