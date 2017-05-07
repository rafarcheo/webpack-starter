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
