import { Buffer } from 'buffer';
import { ColorData } from '../interface';

const drawPixel = (buffer: Buffer, position: number, color: ColorData, alpha: 'none' | number) => {
	buffer.writeUInt8(color.r, position + 1);
	buffer.writeUInt8(color.g, position + 2);
	buffer.writeUInt8(color.b, position + 3);
	if (alpha !== 'none') buffer.writeUInt8(alpha, Math.round(position + 4));
};

const drawOverlapPixel = (buffer: Buffer, position: number, color: ColorData, alpha: number) => {
	const oldColors = {
		r: buffer.readUInt8(Math.round(position + 1)),
		g: buffer.readUInt8(Math.round(position + 2)),
		b: buffer.readUInt8(Math.round(position + 3)),
	};

	const inverseAlpha = 1 - alpha;

	const newColors = {
		r: Math.floor((oldColors.r * inverseAlpha + color.r * alpha)),
		g: Math.floor((oldColors.g * inverseAlpha + color.g * alpha)),
		b: Math.floor((oldColors.b * inverseAlpha + color.b * alpha)),
	};

	buffer.writeUInt8(newColors.r, Math.round(position + 1));
	buffer.writeUInt8(newColors.g, Math.round(position + 2));
	buffer.writeUInt8(newColors.b, Math.round(position + 3));
};

export { drawPixel, drawOverlapPixel };