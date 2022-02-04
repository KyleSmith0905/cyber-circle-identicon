import { CircleData, GradientData, ElementData } from "../interface";
import { POSITION_OFFSET } from "./constants";

const parseColors = (colorHash: string, rotation: number): GradientData => {

	rotation = rotation * Math.PI / 4;

	return {
		start: {
			r: parseInt(colorHash[0], 16) * 16,
			g: parseInt(colorHash[1], 16) * 16,
			b: parseInt(colorHash[2], 16) * 16,
		},
		end: {
			r: parseInt(colorHash[3], 16) * 16,
			g: parseInt(colorHash[4], 16) * 16,
			b: parseInt(colorHash[5], 16) * 16,
		},
		rotation: rotation,
	};
};

const parseCircles = (offsetString: string, hash: string): ElementData[] => {
	const offset = parseInt(offsetString, 16);
	
	const circles = [];
	for (let i = 0; i < hash.length; i += 2) {
		const circle = parseCircle([hash[i], hash[i + 1]], [offset + i, offset + i + 1]);
		circles.push(circle);
	}
	return circles;
};

const parseCircle = (circle: [string, string], offset: [number, number]): ElementData => {
	const a = (parseInt(circle[0], 16) / 15) * 2 * Math.PI;
	const r = 0.5 * Math.sqrt(parseInt(circle[1], 16) / 15);
	const x = r * Math.cos(a);
	const y = r * Math.sin(a);
	
	return {
		x: x + POSITION_OFFSET[offset[0]],
		y: y + POSITION_OFFSET[offset[1]],
		r: undefined
	};
};

const deserialize = (hash: string): CircleData => {
	const foregroundColors = parseColors(hash.substring(0, 6), parseInt(hash[13], 16) % 4);
	const backgroundColors = parseColors(hash.substring(6, 12), parseInt(hash[13], 16) / 4);

	const circles = parseCircles(hash[13], hash.substring(14, 64));

	return {
		foregroundColors: foregroundColors,
		backgroundColors: backgroundColors,
		elements: circles,
	};
};

export default deserialize;