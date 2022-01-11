import { Buffer } from 'buffer';
import { AdditionalOptions, CircleData } from '../interface';
import { pythagorean } from '../utils';
import { drawPixel } from './drawing';
import { clamp } from './utils';

const drawBackground = (circleOptions: CircleData, {size, clipped, smoothEdges}: AdditionalOptions): Buffer => {
	const colors = circleOptions.backgroundColors;
	
	const pixelSize = clipped ? 4 : 3;
	const rowSize = size * pixelSize + 1;
	let colorBuffer = Buffer.alloc(Math.pow(size, 2) * pixelSize + size);

	const findDelta = (prop: 'r' | 'g' | 'b', direction: 'horizontal' | 'vertical'): number => {
		const trig = Math[direction === 'horizontal' ? 'sin' : 'cos'];
		const difference = colors.end[prop] - colors.start[prop];
		return trig(colors.rotation) * difference / size;
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
		const verticalOffset = (Math.cos(colors.rotation) * 0.5 + 0.5) * verticalDelta[prop] * size;
		const horizontalOffset = (Math.sin(colors.rotation) * 0.5 - 0.5) * horizontalDelta[prop] * size;

		return colors.start[prop] + verticalCurrent + verticalOffset + horizontalOffset;
	};

	for (let y = 0; y < size; y++) {
		let currentColor = {
			r: getStartColor(y, 'r'),
			g: getStartColor(y, 'g'),
			b: getStartColor(y, 'b'),
		};

		for (let x = 0; x < size; x++) {
			let color = {
				r: clamp(Math.floor(currentColor.r), minColor.r, maxColor.r),
				g: clamp(Math.floor(currentColor.g), minColor.g, maxColor.g),
				b: clamp(Math.floor(currentColor.b), minColor.b, maxColor.b),
			};
			const offset = x * pixelSize + rowSize * y;
			const distance = pythagorean(x - (size * 0.5) + 0.5, y - (size * 0.5) + 0.5) - 0.25;
			if (clipped && distance > size * 0.5) {
				drawPixel(colorBuffer, offset, color, 0);
			}
			else {
				drawPixel(colorBuffer, offset, color, clipped ? Math.min(((size - distance * 2) / smoothEdges) * 255, 255) : 'none');
			}
			
			currentColor.r += horizontalDelta.r;
			currentColor.g += horizontalDelta.g;
			currentColor.b += horizontalDelta.b;
		}
	}

	return colorBuffer;
};


export default drawBackground;