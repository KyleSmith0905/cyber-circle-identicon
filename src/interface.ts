interface ColorData {
	r: number,
	g: number,
	b: number,
	a?: number,
}

interface GradientData {
	start: ColorData, 
	end: ColorData,
	rotation: number,
}

interface ElementData {
	x: number,
	y: number,
	r: number | undefined,
}

interface CircleData {
	foregroundColors: GradientData;
	backgroundColors: GradientData;
	elements: ElementData[];
}

interface OverrideOptions {
	foregroundColors?: Partial<GradientData>
	backgroundColors?: Partial<GradientData>
	elements?: ElementData[]
}

type CompressionOptions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface AdditionalOptions {
	size?: number;
	overrideData?: OverrideOptions;
	clipped?: boolean;
	compression?: CompressionOptions;
	smoothEdges?: number;
}

export type { GradientData, ElementData, CircleData, AdditionalOptions, OverrideOptions, ColorData, CompressionOptions};