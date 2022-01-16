import { NextPage } from 'next';
import GenerateCircle from '../components/generateCircle';

const Home: NextPage = () => {

	return (
		<>
			<div className='ContentBox'>
				<h2>What Are Cyber Circles?</h2>
				<p>Cyber Circles are randomly generated circles containing smaller circles inside.</p>
				<h2>Generate Cyber Circles</h2>
				<GenerateCircle/>
				<h2>Use With Your JavaScript</h2>
				<p>You can install the <a href='https://github.com/KyleSmith0905/cyber-circle-identicon'>Cyber Circle Identicon library</a> locally using:</p>
				<pre><code>npm install cyber-circle-identicon</code></pre>
				<p>With the package install, you could import it into your code and use it like this:</p>
				<pre>
					import {'{'} createIdenticon {'}'} from {'\''}cyber-circle-identicon{'\''};{'\n'}
					{'\n'}
					const userIdenticon = createIdenticon({'\''}Hello World!{'\''});
				</pre>
				<p>Options could be feed through the second parameter like this:</p>
				<pre>
					import {'{'} createIdenticon {'}'} from {'\''}cyber-circle-identicon{'\''};{'\n'}
					{'\n'}
					const userIdenticon = createIdenticon({'\''}Hello World!{'\''}, {'{'}{'\n'}
					{'\t'}size: 128,{'\n'}
					{'\t'}compression: 1,{'\n'}
					{'\t'}clipped: false,{'\n'}
					{'}'});
				</pre>					
			</div>
		</>
	);
};

export default Home;
