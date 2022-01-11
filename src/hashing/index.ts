import sha256 from "./sha256";
import deserializing from './deserialize';
import { CircleData } from "../interface";

const options = (text: string): CircleData => {
	const hash = sha256(text);

	const circleData = deserializing(hash);

	return circleData;
};

export default options;