var path = require('path');

module.exports = {
	entry: './src/entry.js',
	output: {
		filename: './src/bundle.js',
	},
	module: {
		loaders: [{
			test: [/\.jsx?$/],
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react'],
				plugins: ['transform-decorators-legacy'],
			}
		}]
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx', '*']
	},
};
