import { BinaryLike } from 'crypto';
import { Buffer } from 'buffer';
import options from './deserializing';
import createPNG from './render';
import setElements from './physics';
import type { GradientData, ElementData, CircleData, AdditionalOptions, OverrideOptions, ColorData, CompressionOptions } from './interface';
import { fillIncompleteOptions, overrideData, validateOptions } from './utils';

/**
 * Returns a PNG buffer of a cyber circle generated from a string.
 * @param {BinaryLike} key The key to generate the PNG from. This could be someone's username.
 * @param {object} [additionalOptions] Additional options.
 * @param {number} [additionalOptions.size=256] The size of the image.
 * @param {boolean} [additionalOptions.clipped=true] Whether the image should be clipped to a circle, this should be false if your platform typically clips images to a circle.
 * @param {number} [additionalOptions.compression=6] The compression level of the image, this corresponds with zlib compression.
 * @param {number} [additionalOptions.smoothEdges=1] how much to smooth the edges of each element. This is synonymous to adding anti-aliasing.
 * @param {object} [additionalOptions.overrideData] Overrides the default data, this is great for platforms with themes.
 * @returns A buffer of the cyber circle in PNG format.
 * @example
 * 
 * ```
 * const username = 'Hello World!';
 * 
 * // Returns a 256x256 buffer of a cyber circle
 * const buffer1 = createIdenticon(username);
 * 
 * // Returns a 64x64 buffer of a cyber circle with a custom background color
 * const buffer2 = createIdenticon(username, {
 *   size:64,
 *   overrideData: {
 *     backgroundColors: {
 *       start: {
 *         r: 255,
 * 			   g: 0,
 * 			   b: 0,
 *       }
 * 		 }
 *   }
 * });
 * ```
 */
const createIdenticon = (key: BinaryLike, additionalOptions: AdditionalOptions = {}): Buffer => {
	validateOptions(additionalOptions);
	fillIncompleteOptions(additionalOptions);
	
	try {
		let circleData = options(key);
	
		circleData.elements = setElements(circleData.elements);
	
		overrideData(circleData, additionalOptions.overrideData);
	
		let dataURL = createPNG(circleData, additionalOptions);
	
		return dataURL;
	}
	catch (e) {
		const error = new Error();
		error.name = 'Cyber Circle Identicon';
		error.message = 'An error occured while generating a cyber circle identicon.';
		error.stack = e.stack;
		throw error;
	}
};

/**
 * Generates circle data from a string. This is generated the same way as the identicon.
 * @param {BinaryLike} key The key to generate the circle data from. This could be someone's username.
 * @returns {object} The circle data, this could be fed into the `overrideData` option to render an identicon.
 * @example
 * const username = 'Hello World!';
 * 
 * // Returns a circle data object
 * const circleData = createIdenticon(username);
 * 
 * console.log(circleData); // ...
 * // {
 * //   foregroundColors: {
 * //     start: { r: 112, g: 240, b: 128 },
 * //     end: { r: 48, g: 176, b: 16 },
 * //     rotation: 0
 * //   },
 * //   backgroundColors: {
 * //     start: { r: 96, g: 80, b: 112 },
 * //     end: { r: 240, g: 240, b: 16 },
 * //     rotation: 2.356
 * //   },
 * //   elements: [
 * //     { r: 0.380, x: 0.401, y: 0.651 },
 * //     { r: 0.341, x: 0.523, y: 0.224 },
 * //     { r: 0.311, x: 0.764, y: 0.601 },
 * //     { r: 0.237, x: 0.247, y: 0.361 }
 * //   ]
 * // }
 * 
 */
const getCircleOptions = (key: BinaryLike): CircleData => {
	try {
		let circleData = options(key);

		circleData.elements = setElements(circleData.elements);

		return circleData;
	}
	catch (e) {
		const error = new Error();
		error.name = 'Cyber Circle Identicon';
		error.message = 'An error occured while generating a cyber circle identicon.';
		error.stack = e.stack;
		throw error;
	}
};

export default createIdenticon;

export { getCircleOptions };

export type { GradientData, ElementData, CircleData, AdditionalOptions, OverrideOptions, ColorData, CompressionOptions };