import '../styles/globals.css';
import '../styles/cyberCircle.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<header>
				<h1>Cyber Circles</h1>
			</header>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;