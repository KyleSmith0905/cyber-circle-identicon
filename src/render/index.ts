import { Buffer } from 'buffer';
import { AdditionalOptions, CircleData } from '../interface';
import { writeChunkStart, writeChunkEnd, writeChunk } from './chunking';
import drawBackground from './background';
import drawElements from './elements';


const render = (circleOptions: CircleData, additionalOptions: AdditionalOptions): Buffer => {

	let buffer = Buffer.from('\u0089PNG\r\n\u001a\n', 'ascii');
	
	buffer = writeChunkStart(buffer, additionalOptions.size, additionalOptions.clipped);
	
	const colorBuffer = drawBackground(circleOptions, additionalOptions);

	drawElements(colorBuffer, circleOptions, additionalOptions);

	buffer = writeChunk(buffer, colorBuffer, additionalOptions.compression);
	
	buffer = writeChunkEnd(buffer);

	return buffer;
};

export default render;