import { GetServerSideProps } from "next";
import createIdenticon from "cyber-circle-identicon";
import { randomUTF8 } from "../../lib/utils";

const Generate = () => null;

// NOTE - Next breaks with image/png Content-Type. Use `Next Start` instead.
const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

	if (!/^\/icons\/logo\d+\.png$/.test(req.url)) {
		return {
			props: {},
			notFound: true,
		};
	}
	

	let randomNumber = randomUTF8();
		
	const buffer = createIdenticon(randomNumber, {size: parseInt(req.url.match(/\d+/)[0])});

	res.setHeader('Content-Type', 'image/png');
	res.write(buffer);
	res.end();

	return {
		props: {},
	};
};

export default Generate;


export { getServerSideProps };