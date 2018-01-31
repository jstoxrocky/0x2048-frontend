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
			// loader: 'babel-loader',
			loader: 'babel-loader?presets[]=react,presets[]=es2015',
			query: {
				// presets: ['es2015', 'react'],
				// plugins: ['transform-decorators-legacy'],
				plugins: ['babel-plugin-transform-decorators-legacy'].map(require.resolve),
			}
		}]
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx', '*']
	},
};
