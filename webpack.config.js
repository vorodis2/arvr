const path = require('path');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const root = path.resolve(__dirname, '.');
const dest = path.resolve(__dirname, 'build');

let conf = {
	context: root,
  	entry: './src/index.js',
  	output: {
		path: dest,
		filename: 'build.js',
		hotUpdateChunkFilename: 'hot-update/hot-update.js',
		hotUpdateMainFilename: 'hot-update/hot-update.json',
  	},
  	devServer: {       
        overlay: true,        
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: './index.html',
		}),
    ],
	devtool: 'eval-sourcemap'
};

module.exports = conf;

module.exports = (_env, _options) => {

	let production = (_options.mode === 'production');

	conf.devtool = production ? false : 'eval-sourcemap';
	// conf.devtool = production ? 'source-map' : 'eval-sourcemap';

	return conf;
}