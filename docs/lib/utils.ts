import { ColorData, GradientData } from 'cyber-circle-identicon';

const colorStringToData = (colorString: string): ColorData => {
	const formatColor = (index: number) => parseInt(colorString.substring(index, index + 2), 16);
	
	const colorData = {
		r: formatColor(1),
		g: formatColor(3),
		b: formatColor(5),
	};

	return colorData;
};

const colorDataToString = (color: ColorData): string => {
	const formatColor = (num: number) => num.toString(16).padStart(2, '0');

	return '#' + formatColor(color.r) + formatColor(color.g) + formatColor(color.b);
};

const colorSeparator = (colorString: number): {r: number, b: number, g: number} => {
	return {
		r: Math.floor(colorString / 65536) % 256,
		g: Math.floor(colorString / 256) % 256,
		b: Math.floor(colorString / 1) % 256,
	};
};

const fillColorData = (colorData: ColorData, colorDataOptional?: Partial<ColorData>): ColorData => {
	colorData.r = colorDataOptional?.r ?? colorData.r;
	colorData.g = colorDataOptional?.g ?? colorData.g;
	colorData.b = colorDataOptional?.b ?? colorData.b;
	return colorData;
};

const fillGradientData = (colorData: GradientData, colorDataOptional?: Partial<GradientData>): GradientData => {
	colorData.start = fillColorData(colorData.start, colorDataOptional?.start);
	colorData.end = fillColorData(colorData.end, colorDataOptional?.end);
	colorData.rotation = colorDataOptional?.rotation ?? colorData.rotation;
	return colorData;
};

export { colorDataToString, colorStringToData, colorSeparator, fillColorData, fillGradientData };