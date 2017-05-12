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
