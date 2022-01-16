import Image from 'next/image';
import { FunctionComponent } from 'react';

const CircleImage: FunctionComponent<{src: string}> = ({src}) => {
	return (
		<Image id='IdenticonImage' src={src} alt='Cyber Circle Design' width='256px' height='256px'/>
	);
};

export default CircleImage;