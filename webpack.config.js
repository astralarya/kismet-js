var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname + "/src",
	target: "node",
	entry: {
		console: './console.js',
	},
	output: {
		path: __dirname + '/dist',
		filename: 'kismet.[name].js',
		library: "Kismet",
		libraryTarget: "commonjs2",
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel?cacheDirectory'],
			},
			{
				test: /\.jison$/,
				loader: '../loaders/jison-loader.js'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=1000000&mimetype=application/font-woff'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=1000000&mimetype=application/font-sfnt'
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=1000000&mimetype=application/vnd.ms-fontobject'
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=1000000&mimetype=image/svg+xml'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("kismet.[name].css"),
	],
};


var production_plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': '"production"'
	}),
	new webpack.optimize.UglifyJsPlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.DedupePlugin()
];

if(process.argv.indexOf('--debug') == -1) {
	module.exports.plugins.push(...production_plugins)
}
