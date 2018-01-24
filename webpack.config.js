const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: "./src/index.tsx", // Point to main file
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "bundle.js"
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.ts', '.tsx', '.css', '.scss' ]
	},
	performance: {
		hints: false
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/, 						  // All ts and tsx files will be process by
				loaders: [ 'babel-loader', 'ts-loader' ], // first babel-loader, then ts-loader
				exclude: /node_modules/                   // ignore node_modules
			}, {
				test: /\.jsx?$/,                          // all js and jsx files will be processed by
				loader: 'babel-loader',                   // babel-loader
				exclude: /node_modules/                  // ignore node_modules
			}, {
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!sass-loader'
				})
			}
		]
	},
	devServer: {
		contentBase: "src/",
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				template: "./src/index.html",
				inject: "body"
			}
		),
		new CleanWebpackPlugin(
			["dist"], {
				verbose: true
			}
		),
    	new ExtractTextPlugin("main.css"),
		new webpack.optimize.UglifyJsPlugin(
			{
				/**
				 * mangle: uglify 2's mangle option
				 */
				mangle: true,

				/**
				 * compress: uglify 2's compress option
				 */
				compress: {
					toplevel: true,
					pure_getters: true,
					drop_console: false
				}
			}
		),
		// By default, webpack does `n=>n` compilation with entry files. This concatenates
		// them into a single chunk.
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
