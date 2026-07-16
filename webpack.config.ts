import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
	mode: 'development',
	entry: {
		index: __dirname + '/src/index.ts',
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + '/dist',
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
			filename: 'index.[contenthash].html'
		}),
	],
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		port: 3000,
		static: path.resolve(__dirname, 'dist'),
		open: true,
	},
};
