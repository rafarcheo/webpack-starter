var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname +'/dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/, 
				use:  ExtractTextPlugin.extract({
					fallback: 'style-loader',
					loader: ['css-loader','sass-loader'],
					publicPath:  __dirname +'/dist'
				})
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000,
		stats: "errors-only",
		open: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Custom template',
			// minify: {
			// 	collapseWhitespace: true
			// },
			hash: true,
			template: __dirname + '/src/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
		}),
		new ExtractTextPlugin('app.css')
	]
}

