import options from './hashing';
import createPNG from './render';
import setElements from './physics';
import type { GradientData, ElementData, CircleData, AdditionalOptions, OverrideOptions, ColorData, CompressionOptions } from './interface';
import { fillIncompleteOptions, overrideData, validateKey, validateOptions } from './utils';
import { Buffer } from 'buffer';

/**
 * Returns a PNG buffer of a cyber circle generated from a string.
 * @param {string} key The key to generate the PNG from. This could be someone's username.
 * @param {object} [additionalOptions] Additional options.
 * @param {number} [additionalOptions.size=256] The size of the image.
 * @param {boolean} [additionalOptions.clipped=true] Whether the image should be clipped to a circle, this should be false if your platform typically clips images to a circle.
 * @param {number} [additionalOptions.compression=6] The compression level of the image, this corresponds with zlib compression.
 * @param {number} [additionalOptions.smoothEdges=1] how much to smooth the edges of each element. This is synonymous to adding anti-aliasing.
 * @param {object} [additionalOptions.overrideData] Overrides the default data, this is great for platforms with themes.
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
 * @returns A buffer of the cyber circle in PNG format.
 */
const createIdenticon = (key: string, additionalOptions: AdditionalOptions = {}): Buffer => {
	validateKey(key);
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

};

export default createIdenticon;


export type { GradientData, ElementData, CircleData, AdditionalOptions, OverrideOptions, ColorData, CompressionOptions };