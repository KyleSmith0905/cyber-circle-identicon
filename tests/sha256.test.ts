import sha256 from '../src/hashing/sha256';
import { STANDARD_HASH } from './constants';

describe('SHA-256', () => {
	test('Hash of normal string', () => {
		expect(sha256('hello world')).toBe(STANDARD_HASH);
	});

	test('Hash of empty string', () => {
		expect(sha256('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
	});

	test('Hash of long string', () => {
		expect(sha256('x'.repeat(4096))).toBe('a2e659dacb4691e887ac0139f8893d04764ee197d70fb73d3190d56113d18e3e');
	});

	test('Hash of strange unicode', () => {
		expect(sha256('🄷🅴𝔩ℓö Ŵｏr͓̽l̷d̶')).toBe('e24b065ecb7b31156f7e5c4ebfb94812efa4237aa33c2a38323b0f1b21fdcdef');
	});
	
	test('Hash of foreign languages', () => {
		expect(sha256('你好世界 مرحبا بالعالم Γειά σου Κόσμε')).toBe('9b3b1757e82656f7dc49fd3f6679d9436867b9a028ec27b3b80f3f4c484d666f');
	});

	test('Hash of buffer', () => {
		expect(sha256(Buffer.from('hello world'))).toBe(STANDARD_HASH);
	});
});