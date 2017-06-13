# Webpack tutorial

### Wymagania

Do korzystania z webpack potrzebny jest:
* node 
* npm

Czy mamy zainstalowany node i npm w sprawdzamy konsoli:

```
node -v  
npm -v
```
### Tworzymy projekt:

#### Tworzymy nowy projekt - używając npm
Bedąc w głównym katalogu naszego nowego projektu w konsoli wpisujemy:  
```
npm init
```
> generator zapyta o szereg spraw.. m.in. _name_ i _description_ i to są pola obowiązkowe.  
Resztę możemy oninąć - klikając _enter_, na końcu potwierdzmy dane wpisujac *yes* - zostanie utworzony plik package.json

#### instalacja webpack

Globalna instalacja _webpack_:
```
$ npm -g i webpack
```
Instalacja weback w projojekcie npm: 
```
$ npm i -D webpack
```
> * i = install
> * D = --save-dev 

##### Instalacja konkretnej wersji:
Sprawdzenie dostępnych wersji:
```
 npm view webpack versions --json
```
Instalacja wersji 2.5.0
```
npm i -D webpack@2.2.0
```

##### Podstawowa struktura katalogów:
```
|_src
|	|_app.js
|_dist

```

##### Wywołanie webpack z konsoli:
```
$ webpack ./src/app.js ./dist/app/bundle.js
$ webpack ./src/app.js ./dist/app/bundle.js -p
$ webpack ./src/app.js ./dist/app/bundle.js -p --watch
```
_ -p = production - zminifikowane_
_ -w = watch_

##### Plik konfiguracyjny webpack:
*webpack.coonfig.js*
```
module.exports = {
	entry: './src/app.js',
	output: {
		filename: './dist/app.bundle.js'
	}
}
```

##### Npm komendy
W pliku *package.json* można tworzyć komendy:

```
  ...

  "scripts": {
    "dev": "webpack -d --watch",
    "prod": "webpack -p"
  },
  ...

```
_-d = development_
wywołanie powyższej komendy:
```
npm run dev
npm run prod
```
### Webpack Plugin
Generowanie pliku html z templatu .ejs - z załączonym plikiem js 
 _ [Link do pluginu - html-webpack-plugin ](https://github.com/jantimon/html-webpack-plugin}_
 1. Installation:
 ```
 npm i html-webpack-plugin --save-dev
 ```
 2. W pliku webpack.config.js dodajemy:
 ```
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: __dirname + '/src/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
    })
  ]
 ```
 3. Tworzymy template - plik src/index.ejs:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  <div>Page content goes hire..</div>
  </body>
</html>
```

### Loaders
_Podpięcie css do naszego pliku index.html_
```
_umożliwia załączenie css do poliku html_  
npm install css-loader --save-dev  
_wkleja css jako css do header - w tag style_   
npm install style-loader --sve-dev  
_scss_
npm install sass-loader node-sass --save-dev
```
Tworzymy plik css: *src/app.css*   go importujemy w pliku app.js 
```
const css = require('./app.scss');
```

W pliku webpack.config.js dodajemy objekt module:
```
module: {
  rules: [
  {test: /\.css$/, use: 'css-loader'}
  ]
}
_dla wielu loaderów - są wczytywane od ostatniego:_
module: {
  rules: [
  {test: /\.css$/, use: ['style-loader','css-loader']}
  ]
}
_scss_
module: {
  rules: [
  {test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']}
  ]
}
```
### Zapis do osobnego pliku wynikowych css'ów
Instalacja:
```
npm install --save-dev extract-text-webpack-plugin
```
[webpack extract text plugin](https://www.npmjs.com/package/extract-text-webpack-plugin-webpack-2)

# W pliku webpack.config.js dodajemy
```
  module: {
    rules: [
      {
        use:  ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: ['css-loader','sass-loader'],
          publicPath:  __dirname +'/dist'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ]
```

### Serwer:

instalacja:
```
npm i webpack-dev-server -D
```

package.json 
```
    ...
  "scripts": {
    "dev": "webpack-dev-server",
    ...
```

webpack.config.js: 

```
var path = require("path");

  output: {
    path: path.resolve(__dirname +'/dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"), // inaczej plii dist beda tylko w pamieci - nie zapisywane na dysk
    compress: true,
    port: 9000,
    stats: "errors-only", // mniej info w konsoli
    open: true // otwiera okno po kompilacji
  },
```

### React
1. [quick app - install and it's work](https://github.com/facebookincubator/create-react-app)
2. instalacja samodzielna:
```
npm i -D react react-dom
```
babel
```
npm i -D babel babel-preset-react babel-preset-es2015
```

app.js :
```
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```
index.ejs
```
<div id="root">
```
.bablerc
```
{
  "presets": ["es2015", "react"]
}
```

loader install
```
npm install --save-dev babel-loader babel-core
```

webpack.config.js 
```
  {
    test: /\.js$/,
     exclude: /node_modules/,
      loader: "babel-loader" 
  }
```        
### Multiple templates options
1. Clear dist folder before compile
```
npm i -D rimraf
``` 
add comand to package.json
```
  "scripts": {
    "dev": "npm run clean && webpack-dev-server",
    "clean": "rimraf ./dist/*"
  },
```

### PUG - temlate for node
```
npm install -D pug pug-html-loader
```
webpack,config.js
```
  # module rules:
  {
    test: /\.pug/,
    use: ['html-loader', 'pug-html-loader']
  }

  # plugins:    
    new HtmlWebpackPlugin({
      chunks: ['page'],
      filename: 'page.html',
      template: __dirname + '/src/page.pug', // Load a custom template (ejs by default see the FAQ for details)
    }),
```      
pliki
```
src
  \page.pug
```

### Mulit js bundle
webpack.config.js
```
  ...
  # one file
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname +'/dist'),
    filename: 'app.bundle.js'
  },


  # more files
  entry: {
    app: './src/app.js',
    page: './src/page.js'
  },
  output: {
    path: path.resolve(__dirname +'/dist'),
    filename: '[name].bundle.js'
  },

  ...

  # plugins

    new HtmlWebpackPlugin({
      title: 'Contact from file html',
      cache: false,
      hash: true,
      excludeChunks: ['page'],
      chunks: ['page'],
      filename: 'contact.html',
      template: __dirname + '/src/contact.html'
    }),

### hot mode replacement css

webpack.config.js
```
  var webpack = require('webpack');
  ...

  devServer: {
    ...
    hot: true,
    ...
  }
  ...
  module: {
    rules: [
      {
        test: /\.scss$/, 
        use: ['style-loader','css-loader','sass-loader'],
      }
    ]
  }
  ...

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],

```
app.js:
```
import css from './app.scss'
```

Kompilacja scss na podzielona na produkcujną (do osobnego pliku scss) i developerską (geerowane do head pliku html - by Hot Module Replacement)
```
  # package.json
  "scripts": {
    "dev": "webpack-dev-server",
    "dev-no-swever": "webpack -d --watch",
    "prod": "npm run clean && NODE_ENV='production' webpack -p",
    "prod-windows": "npm run clean && SET NODE_ENV=development && webpack -p",
    "clean": "rimraf ./dist/*"
  },
```

```
# webpack.config.js

var isProd = process.env.NODE_ENV === 'production';  // true | false
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  loader: ['css-loader','sass-loader'],
  publicPath:  __dirname +'/dist'
});
cssConfig = isProd ? cssProd : cssDev;


  rules: [
      {
        test: /\.scss$/, 
        use: cssConfig
      }
    ]
    ...
    plugins: [
      new ExtractTextPlugin({
        filename:'app.css', // albo filename:'/css/[name].css',
        disable: !isProd,
        allChunks: true
      })
    ]
```

### Images in css
zdjęcie
src
  \images
        \a.jpg
zostanie obrobione i przeniesione do w dist/images/a.jpg        
Scan css to find 
```
npm i -D file-loader
```
webpack.config.js
```
  {
    test: /\.(jpe?g|svg|png|gif)$/,
    use: "file-loader?name=[name].[ext]&outputPath=images/" // files save orginal name save
    // use: "file-loader" // random name
    // use: "file-loader?name=[hash:12].[ext]&Path=images/" 
  },
```

##### Optimalize images
```
npm i -D image-webpack-loader

webpack.config.js


  {
    test: /\.(jpe?g|svg|png|gif)$/,
    use: ["file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/", "image-webpack-loader"]
  }
```

### Bootstrap in react
npm i bootstrap-loader -D
npm i resolve-url-loader url-loader -D

Bootstrap install:
https://github.com/shakacode/bootstrap-loader

npm install --save-dev bootstrap-dev bootstrap-sass
npm install --save-dev css-loader node-sass resolve-url-loader sass-loader style-loader url-loader

by mieć wpływ na to co instalujemy z bootstrap tworzymy plok konfiguracyhny
.bootstraprc a w nim treść z:
- https://github.com/shakacode/bootstrap-loader/blob/master/.bootstraprc-3-default (bootstrap 3)

oraz 
webpack.bootstrap.config.js
treść z
https://github.com/shakacode/bootstrap-loader/blob/master/examples/basic/webpack.bootstrap.config.js

A w pliku webpacj.config.js:
var bootstrapEntryPoints = require("./webpack.bootstrap.config");
var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

webpack.config
{ 
    test: /\.(woff2?|svg)$/, 
    loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' 
},
{ 
    test: /\.(ttf|eot)$/, 
    loader: 'file-loader?&name=fonts/[name].[ext]' 
},
add jquery

{ 
  test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, 
  loader: 'imports-loader?jQuery=jquery' 
}

npm i -D imports-loader jquery

w plikach js wymagających juery piszemy:
global.jQuery = require('jquery'); 