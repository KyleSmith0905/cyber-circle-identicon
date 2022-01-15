import { AdditionalOptions, CircleData, ElementData, GradientData } from '../interface';
import { Buffer } from 'buffer';
import { clamp } from './utils';
import { pythagorean } from '../utils';
import { drawOverlapPixel } from './drawing';

const drawElement = (buffer: Buffer, colors: GradientData, element: ElementData, {size, clipped, smoothEdges}: AdditionalOptions) => {
	const circleSize = element.r * size;
	const circleOffsetX = Math.round(element.x * size - circleSize * 0.5);
	const circleOffsetY = Math.round(element.y * size - circleSize * 0.5);
	if (circleOffsetX + circleSize > size || circleOffsetY + circleSize > size || circleOffsetX < 0 || circleOffsetY < 0) return;

	const pixelSize = clipped ? 4 : 3;
	const rowSize = size * pixelSize + 1;

	const findDelta = (prop: 'r' | 'g' | 'b', direction: 'horizontal' | 'vertical'): number => {
		const trig = Math[direction === 'horizontal' ? 'sin' : 'cos'];
		const difference = colors.end[prop] - colors.start[prop];
		return trig(colors.rotation) * difference / circleSize;
	};
	
	const horizontalDelta = {
		r: findDelta('r', 'horizontal'),
		g: findDelta('g', 'horizontal'),
		b: findDelta('b', 'horizontal'),
	};
	const verticalDelta = {
		r: findDelta('r', 'vertical'),
		g: findDelta('g', 'vertical'),
		b: findDelta('b', 'vertical'),
	};

	const maxColor = {
		r: Math.max(colors.end.r, colors.start.r),
		g: Math.max(colors.end.g, colors.start.g),
		b: Math.max(colors.end.b, colors.start.b),
	};
	const minColor = {
		r: Math.min(colors.end.r, colors.start.r),
		g: Math.min(colors.end.g, colors.start.g),
		b: Math.min(colors.end.b, colors.start.b),
	};

	const getStartColor = (y: number, prop: 'r' | 'g' | 'b'): number => {
		const verticalCurrent = -verticalDelta[prop] * y;
		const verticalOffset = (Math.cos(colors.rotation) * 0.5 + 0.5) * verticalDelta[prop] * circleSize;
		const horizontalOffset = (Math.sin(colors.rotation) * 0.5 - 0.5) * horizontalDelta[prop] * circleSize;

		return colors.start[prop] + verticalCurrent + verticalOffset + horizontalOffset;
	};

	for (let y = 0; y < circleSize; y++) {
		const bufferOffset = (y + circleOffsetY) * rowSize + circleOffsetX * pixelSize;
		let currentColor = {
			r: getStartColor(y, 'r'),
			g: getStartColor(y, 'g'),
			b: getStartColor(y, 'b'),
		};

		for (let x = 0; x < circleSize; x++) {
			let color = {
				r: clamp(Math.floor(currentColor.r), minColor.r, maxColor.r),
				g: clamp(Math.floor(currentColor.g), minColor.g, maxColor.g),
				b: clamp(Math.floor(currentColor.b), minColor.b, maxColor.b),
			};
			const offset = x * pixelSize + bufferOffset;
			const distance = pythagorean(x - (circleSize * 0.5) + 0.5, y - (circleSize * 0.5) + 0.5) - 0.25;
			if (distance > circleSize * 0.5) {
				drawOverlapPixel(buffer, offset, color, 0);
			}
			else {
				drawOverlapPixel(buffer, offset, color, Math.min((circleSize - distance * 2) / smoothEdges, 1));
			}
			
			currentColor.r += horizontalDelta.r;
			currentColor.g += horizontalDelta.g;
			currentColor.b += horizontalDelta.b;
		}
	}
};

const drawElements = (buffer: Buffer, circleOptions: CircleData, additionalOptions: AdditionalOptions) => {
	const colors = circleOptions.foregroundColors;
	const circleElements = circleOptions.elements;
	const circleElementsLength = circleElements.length;
	for (let i = 0; i < circleElementsLength; i++) {
		drawElement(buffer, colors, circleElements[i], additionalOptions);
	}
};

export default drawElements;