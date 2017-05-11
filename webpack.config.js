var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: __dirname +'/dist',
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Custom template',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: __dirname + '/src/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
		})
	]
}

