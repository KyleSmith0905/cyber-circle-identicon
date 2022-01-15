import Image from 'next/image';
import { FunctionComponent } from 'react';

const CircleImage: FunctionComponent<{src: string, size: number}> = ({src, size}) => {
	return (
		<Image id='IdenticonImage' src={src} alt='Cyber Circle Design' width={size} height={size}/>
	);
};

export default CircleImage;
