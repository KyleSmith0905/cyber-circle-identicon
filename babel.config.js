module.exports = {
	presets: [
		['@babel/preset-env'],
		['@babel/preset-typescript'],
		['minify', {builtIns: false}]
	],
	plugins: [
		'@babel/plugin-proposal-class-properties'
	]
};