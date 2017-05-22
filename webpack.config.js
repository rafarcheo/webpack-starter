var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require("path");

var isProd = process.env.NODE_ENV === 'production';  // true | false
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	loader: ['css-loader','sass-loader'],
	publicPath:  __dirname +'/dist'
});
cssConfig = isProd ? cssProd : cssDev;

module.exports = {
	entry: {
		app: './src/app.js',
		page: './src/page.js'
	},
	output: {
		path: path.resolve(__dirname +'/dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/, 
				use: cssConfig
				// use: ['style-loader','css-loader','sass-loader'],
				// use:  ExtractTextPlugin.extract({
				// 	fallback: 'style-loader',
				// 	loader: ['css-loader','sass-loader'],
				// 	publicPath:  __dirname +'/dist'
				// })
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader" 
			},
			{
				test: /\.(jpg|svg|png)$/,
				use: "file-loader" 
			},
			{
				test: /\.pug/,
				use: ['html-loader', 'pug-html-loader']
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000,
		hot: true,
		stats: "errors-only",
		open: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Custom from template ejs',
			cache: false,
			minify: {
				collapseWhitespace: true
			},
			excludeChunks: ['page'],
			hash: true,
	//		filename: 'a.html',
			template: __dirname + '/src/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
		}),
		new HtmlWebpackPlugin({
			title: 'Contact from file html',
			cache: false,
			hash: true,
			excludeChunks: ['page'],
			filename: 'contact.html',
			template: __dirname + '/src/contact.html', // Load a custom template (ejs by default see the FAQ for details)
		}),
		new HtmlWebpackPlugin({
			chunks: ['page'],
			filename: 'page.html',
			template: __dirname + '/src/page.pug', // Load a custom template (ejs by default see the FAQ for details)
		}),
		new ExtractTextPlugin({
			filename:'app.css',
			disable: !isProd,
			allChunks: true
		}),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NamedModulesPlugin()
	]
}

