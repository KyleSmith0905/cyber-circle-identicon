import { FunctionComponent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fillGradientNaming, rgbToBrightness } from '../lib/color';
import { colorDataToString, colorStringToData, fillColorData } from '../lib/utils';
import createIdenticon, { getCircleOptions, OverrideOptions, CompressionOptions, GradientData } from 'cyber-circle-identicon';

const ImageComponent = dynamic(() => import('./circleImage'), {ssr: false});

let circleOptions = getCircleOptions('insert your name here');
let overrideOptions: {
	backgroundColors: Partial<GradientData>,
	foregroundColors: Partial<GradientData>
} = {backgroundColors: {}, foregroundColors: {}};
let key = 'insert your name here';

const ColorInput: FunctionComponent<{reloadIdenticon: () => void, place: string}> = ({reloadIdenticon, place}) => {

	const elementId = place === 'Foreground' ? 'GradientNamingForeground' : 'GradientNamingBackground';
	const propName = place === 'Foreground' ? 'foregroundColors' : 'backgroundColors';
	const overrideColor = overrideOptions[propName];

	useEffect(() => {
		setTextStyle('start');
		setTextStyle('end');
	});

	const localColorDataToString = (prop: string) => {
		return colorDataToString(fillColorData(circleOptions[propName][prop], overrideColor[prop]));
	};

	const setNameButton = () => {
		const button = document.getElementById(elementId) as HTMLButtonElement;
		if (button === null) return;

		button.innerText = place + ' Color: '+ fillGradientNaming(circleOptions[propName], overrideColor);
	};

	const setTextStyle = (position: string) => {
		const sliderText = document.getElementById(position + place);
		if (!sliderText) return;
		const textColor = rgbToBrightness(fillColorData(circleOptions[propName][position], overrideColor[position])) > 50 ? '#000000' : '#FFFFFF';
		sliderText.style.color = textColor;
	};

	return (
		<>
			<div className='InputContainer'>
				<input type='color' className='Button'
					style={{backgroundColor: localColorDataToString('start')}}
					value={localColorDataToString('start')}
					onInput={(e) => {
						e.currentTarget.style.setProperty('background-color', e.currentTarget.value);
						overrideColor.start = colorStringToData(e.currentTarget.value);
						setNameButton();
						setTextStyle('start');
						reloadIdenticon();
					}}
				/>
				<p id={'start' + place} className='MergeBefore' style={{}}>Start Color</p>
			</div>
			<div className='InputContainer'>
				<input type='color' className='Button'
					style={{backgroundColor: localColorDataToString('end')}}
					value={localColorDataToString('end')}
					onInput={(e) => {
						e.currentTarget.style.setProperty('background-color', e.currentTarget.value);
						overrideColor.end = colorStringToData(e.currentTarget.value);
						setNameButton();
						setTextStyle('end');
						reloadIdenticon();
					}}
				/>
				<p id={'end' + place} className='MergeBefore'>End Color</p>
			</div>
			<div className='InputContainer'>
				<input type='range' className='Button'
					min='0' max={Math.PI * 2 - Math.PI * 0.25 + Number.EPSILON * 2} step={Math.PI * 0.25}
					onInput={(e) => {
						overrideColor.rotation = parseFloat(e.currentTarget.value);
						reloadIdenticon();
					}}
				/>
				<p className='MergeBefore'>Rotation</p>
			</div>
		</>
	);
};

const GenerateCircle: FunctionComponent = () => {
	
	let compression: CompressionOptions = 6;
	let size = 256;
	let smoothEdges = 1;
	let clipped = true;
	const [foregroundColorOpen, setForegroundColorOpen] = useState(false);
	const [backgroundColorOpen, setBackgroundColorOpen] = useState(false);

	const getIdenticonSrc = (): string => {
		const overrideData: OverrideOptions = {
			foregroundColors: overrideOptions.foregroundColors,
			backgroundColors: overrideOptions.backgroundColors,
		};

		try {
			const identicon = createIdenticon(key, {overrideData, compression, clipped, size, smoothEdges});
			return 'data:image/png;base64,' + identicon.toString('base64');
		}
		catch {
			const image = document.getElementById('IdenticonImage') as HTMLImageElement;
			if (!image) {
				const identicon = createIdenticon(key);
				return 'data:image/png;base64,' + identicon.toString('base64');
			}
			else {
				return image.src;
			}
		}
	};

	let processingIdenticon = false;
	let hasQueue = false;

	const reloadIdenticon = (): void => {
		if (processingIdenticon) {
			hasQueue = true;
			return;
		}

		processingIdenticon = true;
		hasQueue = false;
		requestAnimationFrame(() => {
			const identicon = document.getElementById('IdenticonImage') as HTMLImageElement;
			const download = document.getElementById('DownloadIdenticon') as HTMLAnchorElement;
			if (!identicon || !download) return;
			
			download.href = identicon.src = getIdenticonSrc();
			processingIdenticon = false;
			if (hasQueue === true) reloadIdenticon();
		});
	};

	return (
		<>
			<div className='PillButtons'>
				<input type='text' className='Button' defaultValue='insert your name here' style={{width: '100%'}} onInput={e => {
					key = e.currentTarget.value;
					circleOptions = getCircleOptions(key);
					const button1 = document.getElementById('GradientNamingForeground') as HTMLButtonElement;
					const button2 = document.getElementById('GradientNamingBackground') as HTMLButtonElement;
					if (button1) button1.innerText = 'Foreground Color: ' + fillGradientNaming(circleOptions.foregroundColors, overrideOptions.foregroundColors);
					if (button2) button2.innerText = 'Background Color: ' + fillGradientNaming(circleOptions.backgroundColors, overrideOptions.backgroundColors);
					reloadIdenticon();
					getCircleOptions(key);
				}}/>
			</div>
			<div className='PillButtons'>
				<div className='InputContainer'>
					<input type='range' className='Button'
						defaultValue={6}
						min={0} max={9} step={1}
						onInput={(e) => {
							compression = e.currentTarget.valueAsNumber as CompressionOptions;
							reloadIdenticon();
						}}
					/>
					<p className='MergeBefore'>Compression</p>
				</div>
				<div className='InputContainer'>
					<input type='range' className='Button'
						defaultValue={8}
						min={1} max={11} step={1}
						onInput={(e) => {
							size = 2 ** e.currentTarget.valueAsNumber;
							reloadIdenticon();
						}}
					/>
					<p className='MergeBefore'>Size</p>
				</div>
				<div className='InputContainer'>
					<input type='range' className='Button'
						defaultValue={1}
						min={0} max={4} step={0.1}
						onInput={(e) => {
							smoothEdges = e.currentTarget.valueAsNumber as CompressionOptions;
							smoothEdges = isNaN(smoothEdges) ? undefined : (2 ** smoothEdges);
							reloadIdenticon();
						}}
					/>
					<p className='MergeBefore'>Smooth Edges</p>
				</div>
				<button className='Button' style={{backgroundColor: 'var(--trenaryColor)'}}
					onClick={(e) => {
						clipped = !clipped;
						e.currentTarget.style.backgroundColor = clipped ? 'var(--trenaryColor)' : 'var(--primaryColor)';
						reloadIdenticon();
					}}
				>
					Clipped
				</button>
			</div>
			<div className='PillButtons'>
				<button id='GradientNamingForeground' className='Button'
					style={{backgroundColor: foregroundColorOpen ? 'var(--primaryColor)' : 'var(--trenaryColor)'}}
					onClick={() => {
						setForegroundColorOpen(!foregroundColorOpen);
						overrideOptions.foregroundColors = {};
					}}
				>
					Foreground Color: {fillGradientNaming(circleOptions.foregroundColors, overrideOptions.foregroundColors)}
				</button>
				{foregroundColorOpen && 
					<ColorInput	reloadIdenticon={reloadIdenticon}	place='Foreground'/>
				}
				<button id='GradientNamingBackground' className='Button'
					style={{backgroundColor: foregroundColorOpen ? 'var(--primaryColor)' : 'var(--trenaryColor)'}}
					onClick={() => {
						setBackgroundColorOpen(!backgroundColorOpen);
						overrideOptions.backgroundColors = {};
					}}
				>
					Background Color: {fillGradientNaming(circleOptions.backgroundColors, overrideOptions.backgroundColors)}
				</button>
				{backgroundColorOpen && 
					<ColorInput reloadIdenticon={reloadIdenticon} place='Background'/>
				}
			</div>
			<div className='MarginCentered'>
				<ImageComponent src={getIdenticonSrc()}/>
			</div>
			<div className='PillButtons'>
				<a id='DownloadIdenticon' className='Button' download={true}>
					Download
				</a>
			</div>
		</>
	);
};

export default GenerateCircle;