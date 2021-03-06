# Cyber Circle Identicons

## Examples

Despite 1 letter being different, the entire image is different.

<table>
	<tr>
		<td>
			<img src='assets/Cyber%20Circle.png' alt='Example 1 Cyber Circle' />
			<h3>Cyber Circle</h3>
		</td>
		<td>
			<img src='assets/Cyber__Circle.png' alt='Example 2 Cyber Circle' />
			<h3>Cyber_Circle</h3>
		</td>
		<td>
			<img src='assets/Cyber-Circle.png' alt='Example 3 Cyber Circle' />
			<h3>Cyber-Circle</h3>
		</td>
	</tr>
	<tr>
		<td>
			<img src='assets/Cyber%20_circle.png' alt='Example 4 Cyber Circle' />
			<h3>Cyber circle</h3>
		</td>
		<td>
			<img src='assets/_cyber%20Circle.png' alt='Example 5 Cyber Circle' />
			<h3>cyber Circle</h3>
		</td>
		<td>
			<img src='assets/_cyber%20_circle.png' alt='Example 6 Cyber Circle' />
			<h3>cyber circle</h3>
		</td>
	</tr>
</table>

## Usage

```
npm install cyber-circle-identicon
```

### Download on Node.js
```ts
import { createIdenticon } from 'cyber-circle-identicon';
import { writeFileSync } from 'fs';

const userIdenticon = createIdenticon('Hello World!');
writeFileSync('identicon.png', userIdenticon);
```

### As a  React \<img> source
```tsx
import { createIdenticon } from 'cyber-circle-identicon'

const ReactComponent = () => {
	const userIdenticon = createIdenticon('Hello World!');

	return (
		<img src={'data:image/png;base64,' + cyberCirclePNG.toString('base64')} />
	);
};
```

## Documentation

### `CreateIdenticon`
Returns a PNG buffer of a cyber circle generated from a string.

`key`: string - The key to generate the PNG from. For example, this is someone's username.

`additionalOptions`: object - An object of options for greater customization.
* `size`: number - The size of the image.
* `clipped`: boolean - Whether the image should be clipped to a circle, this should be false if your platform typically clips images to a circle.
* `compression`: number - The compression level of the image, this corresponds with zlib compression.
* `smoothEdges`: number - how much to smooth the edges of each element. This is synonymous to adding anti-aliasing.
* `overrideData`: object - Overrides the default data, this is great for platforms with themes.

## Contribute
Any contribution is greatly appreciated. Feel free to fork the repository and submit a pull request.

I will actively review all issues and pull requests.

### Contributors
<table>
	<tr>
		<td>
			<img src='assets/KyleSmith0905.png' alt='Kyle Smith contributor cyber circle' />
			<h3>KyleSmith0905</h3>
			<p>Owner<p>
		</td>
	</tr>
</table>