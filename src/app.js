// const css = require('./app.scss');
global.jQuery = require('jquery');

import css from './app.scss'
console.log("app.js file!!");
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);

jQuery('body').css({'background-color':'red'});
import bar from './js/bar';


bar();