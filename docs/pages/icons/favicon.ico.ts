import toIcon from 'to-icon';
import createIdenticon from 'cyber-circle-identicon';
import { GetServerSideProps } from 'next';
import { randomUTF8 } from '../../lib/utils';

const faviconIco = () => null;

const getServerSideProps: GetServerSideProps = async ({res}) => {
	let randomNumber = randomUTF8();

	const buffer1 = createIdenticon(randomNumber, {size: 16});
	const buffer2 = createIdenticon(randomNumber, {size: 32});
	const buffer3 = createIdenticon(randomNumber, {size: 64});
	const buffer4 = createIdenticon(randomNumber, {size: 128});

	const icon = await toIcon([buffer1, buffer2, buffer3, buffer4]);
	res.setHeader('Content-Type', 'image/x-icon');
	res.write(icon);
	res.end();

	return {
		props: {},
	};
};

export default faviconIco;

export { getServerSideProps };