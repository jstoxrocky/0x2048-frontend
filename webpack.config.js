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
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }, {
      test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file?name=fonts/[name].[ext]"
    }]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
};
