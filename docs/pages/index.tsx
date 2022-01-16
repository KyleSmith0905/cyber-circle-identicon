import { NextPage } from 'next';
import GenerateCircle from '../components/generateCircle';

const Home: NextPage = () => {

	return (
		<>
			<div className='ContentBox'>
				<h2>What are Cyber Circles?</h2>
				<p>Cyber Circles are randomly generated circles containing smaller circles inside.</p>
				<h2>Generate Cyber Circles</h2>
				<GenerateCircle/>
			</div>
		</>
	);
};

export default Home;
