import { Buffer } from 'buffer';

const rightRotate = (value: number, shift: number) => {
	return (value >>> shift) | (value << (32 - shift));
};

const bufferToChunks = (buffer: Buffer, size: number): Buffer[] => {
	const numChunks = Math.ceil(buffer.byteLength / size);
	const chunks: Buffer[] = [];

	for (let i = 0; i < numChunks; ++i) {
		chunks.push(buffer.slice(i * size, (i + 1) * size));
	}

	return chunks;
};

const bufferToInteger = (buffer: Buffer): number => {
	const integer = buffer.readUInt32BE();
	return integer;
};

const formatChunk = (chunk: number) => {
	return Math.abs(chunk).toString(16).padStart(8, '0');
};

export { rightRotate, bufferToChunks, bufferToInteger, formatChunk };