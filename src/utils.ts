import { Buffer } from 'buffer';
import { UNSIGNED_INTEGER_MAX } from './hashing/constants';
import { AdditionalOptions, CircleData, OverrideOptions } from './interface';

const overrideData = (circleData: CircleData, overrideData: OverrideOptions): void => {

	// This is probably not the best way to do this, but it works for now.
	circleData.foregroundColors.start.r = overrideData.foregroundColors?.start?.r || circleData.foregroundColors.start.r;
	circleData.foregroundColors.start.g = overrideData.foregroundColors?.start?.g || circleData.foregroundColors.start.g;
	circleData.foregroundColors.start.b = overrideData.foregroundColors?.start?.b || circleData.foregroundColors.start.b;
	circleData.foregroundColors.rotation = overrideData.foregroundColors?.rotation || circleData.foregroundColors.rotation;
	circleData.backgroundColors.start.r = overrideData.backgroundColors?.start?.r || circleData.backgroundColors.start.r;
	circleData.backgroundColors.start.g = overrideData.backgroundColors?.start?.g || circleData.backgroundColors.start.g;
	circleData.backgroundColors.start.b = overrideData.backgroundColors?.start?.b || circleData.backgroundColors.start.b;
	circleData.backgroundColors.rotation = overrideData.backgroundColors?.rotation || circleData.backgroundColors.rotation;
	circleData.elements = overrideData.elements || circleData.elements;
};

const fillIncompleteOptions = (circleData: AdditionalOptions): void => {
	circleData.size = circleData.size || 256;
	circleData.overrideData = circleData.overrideData || {};
	circleData.clipped = circleData.clipped || true;
	circleData.compression = circleData.compression || 6;
	circleData.smoothEdges = circleData.smoothEdges || 1;
};

const concatStringToBuffer = (buffer: Buffer, string: string): Buffer => {
	return Buffer.concat([buffer, Buffer.from(string, 'ascii')]);
};

const modulo = (value: number, mod: number = UNSIGNED_INTEGER_MAX) => {
	return ((value % mod) + mod) % mod;
};

const pythagorean = (a: number, b: number): number => {
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
};

export { overrideData, concatStringToBuffer, modulo, pythagorean, fillIncompleteOptions };