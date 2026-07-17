import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'node:url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin()
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
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							esModule: true,
							modules: {
								namedExport: true,
								localIdentName: '[local]__[name]__word-wander',
							},
						},
					},
				],
			},
		],
	},
	devServer: {
		port: 3000,
		static: path.resolve(__dirname, 'dist'),
		historyApiFallback: true,
		open: true,
	},
};
