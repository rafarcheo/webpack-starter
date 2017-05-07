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