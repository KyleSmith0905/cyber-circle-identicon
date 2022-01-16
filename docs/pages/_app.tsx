import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<title>Cyber Circles Identicons - Documentation</title>
				<meta name='description' content='Cyber Circle are circles containing a variety of randomly spaced circles inside. Cyber circles are generated using text, input a text to have it generate a Cyber Circle.' />
				<meta name='keywords' content='icon, identicon, picture, circles, avatar, documentation' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content='#ffffff' />
				<link rel='icon' type='image/ico' href='/icons/favicon.ico' />
				<link rel='apple-touch-icon' href='/icons/logo192.png' />
				<link rel='manifest' href='/manifest.json' />
				<meta name='HandheldFriendly' content='True' />
				{/* Open Graphics */}
				<meta property='og:site_name' content='Cyber Circle Identicons - Documentation' />
				<meta property='og:url' content='https://ccidenticon.vercel.com' />
				<meta property='og:keywords' content='icon, identicon, picture, circles, avatar, documentation' />
				<meta property='og:locale' content='en-US' />
				<meta property='og:type' content='website' />
				<meta property='og:image:url' content='/icons/logo256.png' />
				<meta property='og:image:alt' content='Cyber Circle Identicon' />
				<meta property='og:image:type' content='image/png' />
				<meta property='og:image:width' content='512' />
				<meta property='og:image:height' content='512' />
				<meta property='og:title' content='Cyber Circle Identicons - Documentation' />
				<meta property='og:description' content='Cyber Circle are circles containing a variety of randomly spaced circles inside. Cyber circles are generated using text, input a text to have it generate a Cyber Circle.' />
				{/* Twitter */}
				<meta name='twitter:card' content='summary' />
				<meta name='twitter:image' content='/icons/logo256.png' />
				<meta name='twitter:image:alt' content='Cyber Circle Identicon' />
				<meta name='twitter:title' content='Cyber Circle Identicons - Documentation' />
				<meta name='twitter:description' content='Cyber Circle are circles containing a variety of randomly spaced circles inside. Cyber circles are generated using text, input a text to have it generate a Cyber Circle.' />
			</Head>
			<header>
				<h1>Cyber Circles</h1>
			</header>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;