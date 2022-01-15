import { fillGradientData } from './utils';
import { ColorData, GradientData } from 'cyber-circle-identicon';

const rgbToBrightness = ({r, g, b}: ColorData): number => {
	const average = (r + g + b) / 3;

	return (average / 255) * 100;
};

const rgbToHSV = ({r, g, b}: ColorData): {h: number, s: number, v: number} => {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	const value = (max / 255) * 100;

	let saturation = 0;
	if (max === 0) saturation = 0;
	else saturation = (max - min) / max * 100;

	let hue = 0;
	if (max === min) hue = 0;
	else if (max === r) hue = (g - b) / (max - min) + 6;
	else if (max === g) hue = (b - r) / (max - min) + 2;
	else if (max === b) hue = (r - g) / (max - min) + 4;
	hue = (hue * 60) % 360;
	
	return { h: hue, s: saturation, v: value };
};

const rgbToContrast = (colorOne: ColorData, colorTwo: ColorData): number => {
	const rDifference = Math.abs(colorOne.r - colorTwo.r);
	const gDifference = Math.abs(colorOne.g - colorTwo.g);
	const bDifference = Math.abs(colorOne.b - colorTwo.b);

	const difference = rDifference + gDifference + bDifference;
	return difference;
};

const averageTwoColors = (colorOne: ColorData, colorTwo: ColorData): ColorData => {
	const r = Math.floor((colorOne.r + colorTwo.r) / 2);
	const g = Math.floor((colorOne.g + colorTwo.g) / 2);
	const b = Math.floor((colorOne.b + colorTwo.b) / 2);

	return {r, g, b};
};

const colorNaming = (colorData: ColorData): string => {

	const {h, s, v} = rgbToHSV(colorData);

	if (s ** 0.5 + v ** 0.5 < 12) {
		if (v + (s / 8) < 35) return 'Black';
		else if (v + (s / 8) < 80) return 'Gray';
		else if (v + (s / 8) < 90) return 'Silver';
		else return 'White';
	}
	else if (v + (s / 8) < 75) {
		if (h < 30) return 'Maroon';
		else if (h < 90) return 'Olive';
		else if (h < 150) return 'Green';
		else if (h < 210) return 'Teal';
		else if (h < 270) return 'Navy';
		else if (h < 330) return 'Purple';
		else return 'Maroon';
	}
	else {
		if (h < 30) return 'Red';
		else if (h < 90) return 'Yellow';
		else if (h < 150) return 'Lime';
		else if (h < 210) return 'Aqua';
		else if (h < 270) return 'Blue';
		else if (h < 330) return 'Fuchsia';
		else return 'Red';
	}
};

const gradientNaming = (color: GradientData): string => {

	if (rgbToContrast(color.start, color.end) > 500) return 'Multi-Color';

	const averageColor = averageTwoColors(color.start, color.end);

	const gradientName = colorNaming(averageColor);
	return gradientName;
};

const fillGradientNaming = (gradientData: GradientData, gradientDataOptional?: Partial<GradientData>): string => {
	return gradientNaming(fillGradientData(gradientData, gradientDataOptional));
};

export { fillGradientNaming, rgbToBrightness };