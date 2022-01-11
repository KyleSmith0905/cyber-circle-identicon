import { Buffer } from 'buffer';
import { ROUND_CONSTANTS, DEFAULT_HASH_VALUES, UNSIGNED_INTEGER_MAX } from "./constants";
import { rightRotate, bufferToChunks, bufferToInteger, formatChunk } from "./utils";
import { concatStringToBuffer, modulo } from '../utils';

const formatBuffer = (buffer: Buffer): Buffer => {
	let textLength = buffer.byteLength * 8;

	buffer = concatStringToBuffer(buffer, '\u0080');	

	const k = 60 - (buffer.byteLength % 64);
	
	for (let i = 0; i < k; i++) {
		buffer = concatStringToBuffer(buffer, String.fromCharCode(0x00));
	}
	
	buffer = concatStringToBuffer(buffer, String.fromCharCode((textLength / 16777216) % 256));
	buffer = concatStringToBuffer(buffer, String.fromCharCode((textLength / 65536) % 256));
	buffer = concatStringToBuffer(buffer, String.fromCharCode((textLength / 256) % 256));
	buffer = concatStringToBuffer(buffer, String.fromCharCode(textLength % 256));

	return buffer;
};

const sha256 = (text: string): string => {
	const hashValue = DEFAULT_HASH_VALUES.slice();
	
	let buffer = Buffer.from(text, 'utf8');
	buffer = formatBuffer(buffer);
	const chunks = bufferToChunks(buffer, 64);

	for (let i = 0; i < chunks.length; i++) {
		const words = bufferToChunks(chunks[i], 4).map(bufferToInteger);

		for (let j = 16; j < 64; j++) {
			const gamma0W = words[j - 15];
			const gamma0 = ((gamma0W << 25) | (gamma0W >>> 7)) ^ ((gamma0W << 14) | (gamma0W >>> 18)) ^ (gamma0W >>> 3);
			
			const gamma1W = words[j - 2];
			const gamma1 = ((gamma1W << 15) | (gamma1W >>> 17)) ^ ((gamma1W << 13) | (gamma1W >>> 19)) ^ (gamma1W >>> 10);

			words[j] = modulo(words[j - 16] + gamma0 + words[j - 7] + gamma1);
		}
		
		const hashTemp = hashValue.slice();

		for (let j = 0; j < 64; j++) {
			const sigma0 = (rightRotate(hashTemp[4], 6)) ^ (rightRotate(hashTemp[4], 11)) ^ (rightRotate(hashTemp[4], 25));
			const sigma1 = (rightRotate(hashTemp[0], 2)) ^ (rightRotate(hashTemp[0], 13)) ^ (rightRotate(hashTemp[0], 22));
			const choose = (hashTemp[4] & hashTemp[5]) ^ ((~hashTemp[4]) & hashTemp[6]);
			const majority = (hashTemp[0] & hashTemp[1]) ^ (hashTemp[0] & hashTemp[2]) ^ (hashTemp[1] & hashTemp[2]);
			const temp0 = hashTemp[7] + sigma0 + choose + ROUND_CONSTANTS[j] + words[j];
			const temp1 = sigma1 + majority;

			for (let i = 7; i >= 0; i--) {
				if (i === 0) hashTemp[i] = temp0 + temp1;
				else if (i === 4) hashTemp[i] = hashTemp[i - 1] + temp0;
				else hashTemp[i] = hashTemp[i - 1];

				hashTemp[i] = hashTemp[i] % UNSIGNED_INTEGER_MAX;
			}
		}
		
		for (let j = 0; j < 8; j++) {
			hashValue[j] = (hashValue[j] + hashTemp[j]) % UNSIGNED_INTEGER_MAX;
		}
	}

	return hashValue.map(formatChunk).join('');
};

export default sha256;