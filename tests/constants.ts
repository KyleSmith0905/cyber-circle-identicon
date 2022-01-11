import { AdditionalOptions, CircleData, ElementData } from "../src/interface";

const STANDARD_HASH = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';

const CIRCLE_OPTIONS: CircleData = {
	foregroundColors: {
		start: { r: 176, g: 144, b: 64 },
		end: { r: 208, g: 32, b: 112 },
		rotation: 1.5707963267948966,
	},
	backgroundColors: {
		start: { r: 176, g: 144, b: 144 },
		end: { r: 48, g: 64, b: 208 },
		rotation: 2.748893571891069
	},
	elements: [
		{ x: 0.4289183716701107, y: 0.10931, r: undefined },
		{ x: -0.21666756729740658, y: -0.14638999999999996, r: undefined },
		{ x: 0.2967607903050799, y: 0.520133054765804, r: undefined },
		{ x: -0.2363670929175276, y: 0.19280388300841897, r: undefined },
		{ x: 0.31349161264519715, y: -0.13077228128814983, r: undefined },
		{ x: 0.12251142614305202, y: -0.26004760456821197, r: undefined },
		{ x: -0.6228629298294508, y: 0.0993876252828354, r: undefined },
		{ x: -0.172277209644419, y: -0.36484992435478303, r: undefined },
		{ x: 0.341358290463863, y: 0.0228199999999999, r: undefined },
		{ x: 0.049427844860616105, y: -0.20617173659421148, r: undefined },
		{ x: -0.29850662451831805, y: -0.13244256773460042, r: undefined },
		{ x: 0.4502927288213005, y: -0.19138832153790009, r: undefined },
		{ x: 0.08086497438250105, y: -0.02684907828575582, r: undefined },
		{ x: -0.47899708582090544, y: -0.01363040765619851, r: undefined },
		{ x: -0.29656339887498945, y: 0.21000916731037084, r: undefined },
		{ x: -0.00887, y: -0.06803, r: undefined },
		{ x: 0.3902843800489659, y: -0.07361246437639346, r: undefined },
		{ x: 0.05745, y: -0.01716, r: undefined },
		{ x: -0.5277390036609748, y: 0.07831138464671578, r: undefined },
		{ x: 0.41369502553198656, y: 0.002269999999999916, r: undefined },
		{ x: -0.35748679774997916, y: -0.4554983346207416, r: undefined },
		{ x: 0.22461981815241092, y: -0.020829611458847715, r: undefined },
		{ x: 0.5626827288213005, y: -0.13408832153790007, r: undefined },
		{ x: 0.09152958290185867, y: -0.4484227162912058, r: undefined },
		{ x: 0.4227546343453227, y: -0.11240842449248845, r: undefined },
	]
};

const CIRCLE_ELEMENTS = CIRCLE_OPTIONS.elements;

const CALCULATED_CIRCLE_ELEMENTS: ElementData[] = [
	{ r: 0.3807307877431757, x: 0.6747788468995064, y: 0.5445424514697149 },
	{ r: 0.34127875184653655, x: 0.28333243270259345, y: 0.35361000000000004 },
	{ r: 0.3111294892118257, x: 0.388732656988122, y: 0.7727582341915571 },
	{ r: 0.2675805205867436, x: 0.575666843915399, y: 0.21291465225700001 },
	{ r: 0.1415845912056503, x: 0.845245442998209, y: 0.3209562578773729 },
];

const CALCULATED_CIRCLE_OPTIONS: CircleData = {
	foregroundColors: CIRCLE_OPTIONS.foregroundColors,
	backgroundColors: CIRCLE_OPTIONS.backgroundColors,
	elements: CALCULATED_CIRCLE_ELEMENTS,
};

const ADDITIONAL_OPTIONS: AdditionalOptions = {
	size: 256,
	overrideData: {},
	clipped: true,
	compression: 6,
	smoothEdges: 1,
};

export { STANDARD_HASH, CIRCLE_ELEMENTS, CALCULATED_CIRCLE_ELEMENTS, CIRCLE_OPTIONS, CALCULATED_CIRCLE_OPTIONS, ADDITIONAL_OPTIONS};