const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
			title: 'Webpack Config',
		}),
	],
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
		usedExports: true,
	},
}