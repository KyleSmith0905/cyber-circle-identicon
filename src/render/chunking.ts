import { Buffer } from 'buffer';
import { deflateSync } from 'zlib';
import { CompressionOptions } from '../interface';

const deflate = (colorBuffer: Buffer, compression: CompressionOptions): Buffer => {
	return deflateSync(colorBuffer, {level: compression});
};

const calculateCRC = (buffer: Buffer): number => {
	let c: number;
	let crcTable: number[] = [];
	for (let i = 0; i < 256; i++) {
		c = i;
		for (let j = 0; j < 8; j++) {
			c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
		}
		crcTable[i] = c;
	}

	let crc = 0 ^ -1;
	for (let i = 0; i < buffer.length; i++ ) {
		crc = (crc >>> 8) ^ crcTable[(crc ^ buffer.readUInt8(i)) & 0xFF];
	}

	const output = (crc ^ (-1)) >>> 0;

	return output;
};

const writeChunkIEND = (buffer: Buffer): Buffer => {
	const length = Buffer.allocUnsafe(4);
	length.writeUInt32BE(0, 0);

	const chunkType = Buffer.from('IEND', 'ascii');

	const crc = Buffer.allocUnsafe(4);
	crc.writeUInt32BE(calculateCRC(chunkType));
	
	const chunk = Buffer.concat([buffer, length, chunkType, crc]);
	return chunk;
};

const writeChunkIHDR = (buffer: Buffer, size: number, alpha: boolean): Buffer => {
	const length = Buffer.allocUnsafe(4);
	length.writeUInt32BE(13, 0);
	
	const chunkType = Buffer.from('IHDR', 'ascii');
	
	let chunkData = Buffer.allocUnsafe(13);
	chunkData.writeUInt32BE(size, 0);
	chunkData.writeUInt32BE(size, 4);
	chunkData.writeUInt8(8, 8);
	chunkData.writeUInt8(alpha === false ? 2 : 6, 9);
	chunkData.writeUInt8(0, 10);
	chunkData.writeUInt8(0, 11);
	chunkData.writeUInt8(0, 12);
	
	let chunk = Buffer.concat([chunkType, chunkData]);
	
	const crc = Buffer.allocUnsafe(4);
	crc.writeUInt32BE(calculateCRC(chunk));

	chunk = Buffer.concat([buffer, length, chunk, crc]);
	return chunk;
};

const writeChunkIDAT = (buffer: Buffer, colorBuffer: Buffer, compression: CompressionOptions) => {
	const chunkType = Buffer.from('IDAT', 'ascii');

	const chunkData = deflate(colorBuffer, compression);

	const length = Buffer.allocUnsafe(4);
	length.writeUInt32BE(chunkData.byteLength);

	let chunk = Buffer.concat([chunkType, chunkData]);

	const crc = Buffer.allocUnsafe(4);
	crc.writeUInt32BE(calculateCRC(chunk));

	chunk = Buffer.concat([buffer, length, chunk, crc]);
	return chunk;
};

export { writeChunkIEND, writeChunkIHDR, writeChunkIDAT };