import { Buffer } from 'buffer';
import { UNSIGNED_INTEGER_MAX } from './hashing/constants';
import { AdditionalOptions, CircleData, OverrideOptions } from './interface';

const validateKey = (key: string): void => {
	if (typeof(key) !== 'string') {
		const error = new Error();
		error.name = 'Cyber Circle Identicon';
		error.message = 'The key must be a string.';
		throw error;
	}
};

const validateOptions = (additionalOptions: AdditionalOptions): void => {
	const options = additionalOptions;
	const error = new Error();
	error.name = 'Cyber Circle Identicon';
	delete error.stack;
	if (options.size && options.size < 0) error.message = 'Size must be greater than 0.';
	else if (options.size && typeof options.size !== 'number' && typeof options.size !== 'bigint') error.message = 'Size must be a number.';
	else if (options.compression && options.compression < -1 && options.compression > 9) error.message = 'Compression must be greater or equal to than -1 and less than or equal to 9.';
	else if (options.compression && typeof options.compression !== 'number' && typeof options.compression !== 'bigint') error.message = 'Compression must be a number.';
	else if (options.smoothEdges && options.smoothEdges < 0) error.message = 'Smooth edges must be greater than 0.';
	else if (options.smoothEdges && typeof options.smoothEdges !== 'number' && typeof options.smoothEdges !== 'bigint') error.message = 'Smooth edges must be a number.';
	else if (options.clipped !== undefined && typeof options.clipped !== 'boolean') error.message = 'Clipped must be a boolean.';

	if (error.message) throw error;
};

const overrideData = (circleData: CircleData, overrideData: OverrideOptions): void => {

	circleData.foregroundColors.start.r = overrideData.foregroundColors?.start?.r ?? circleData.foregroundColors.start.r;
	circleData.foregroundColors.start.g = overrideData.foregroundColors?.start?.g ?? circleData.foregroundColors.start.g;
	circleData.foregroundColors.start.b = overrideData.foregroundColors?.start?.b ?? circleData.foregroundColors.start.b;
	circleData.foregroundColors.end.r = overrideData.foregroundColors?.end?.r ?? circleData.foregroundColors.end.r;
	circleData.foregroundColors.end.g = overrideData.foregroundColors?.end?.g ?? circleData.foregroundColors.end.g;
	circleData.foregroundColors.end.b = overrideData.foregroundColors?.end?.b ?? circleData.foregroundColors.end.b;
	circleData.foregroundColors.rotation = overrideData.foregroundColors?.rotation ?? circleData.foregroundColors.rotation;
	circleData.backgroundColors.start.r = overrideData.backgroundColors?.start?.r ?? circleData.backgroundColors.start.r;
	circleData.backgroundColors.start.g = overrideData.backgroundColors?.start?.g ?? circleData.backgroundColors.start.g;
	circleData.backgroundColors.start.b = overrideData.backgroundColors?.start?.b ?? circleData.backgroundColors.start.b;
	circleData.backgroundColors.end.r = overrideData.backgroundColors?.end?.r ?? circleData.backgroundColors.end.r;
	circleData.backgroundColors.end.g = overrideData.backgroundColors?.end?.g ?? circleData.backgroundColors.end.g;
	circleData.backgroundColors.end.b = overrideData.backgroundColors?.end?.b ?? circleData.backgroundColors.end.b;
	circleData.backgroundColors.rotation = overrideData.backgroundColors?.rotation ?? circleData.backgroundColors.rotation;
	circleData.elements = overrideData.elements ?? circleData.elements;
};

const fillIncompleteOptions = (circleData: AdditionalOptions): void => {
	circleData.size = circleData.size ?? 256;
	circleData.overrideData = circleData.overrideData ?? {};
	circleData.clipped = circleData.clipped ?? true;
	circleData.compression = circleData.compression ?? 6;
	circleData.smoothEdges = (circleData.smoothEdges ?? 1) * 2;
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

export { validateKey, overrideData, concatStringToBuffer, modulo, pythagorean, fillIncompleteOptions, validateOptions };