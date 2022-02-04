import { createHash, BinaryLike} from 'crypto';
import deserializing from './deserialize';
import { CircleData } from '../interface';

const options = (text: BinaryLike): CircleData => {

	let hash: string;
	try {
		hash = createHash('sha256').update(text).digest('hex');
	}
	catch {
		const error = new Error();
		error.name = 'Cyber Circle Identicon';
		error.message = 'An error occured, the key needs to be binary like. If you do not know what you are doing, just convert your key to a string.';
		delete error.stack;
		throw error;
	}

	const circleData = deserializing(hash);

	return circleData;
};

export default options;