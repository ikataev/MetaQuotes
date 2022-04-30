const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.less$/i,
				use: [
					"style-loader",
					"css-loader",
					"less-loader",
				],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},

		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'MetaQuotes',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'data'
				}
			]
		})
	],
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	optimization: {
		moduleIds: 'deterministic',
		usedExports: true,
	},
}