import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Card from './View/Component/Card/Card.js';
import * as serviceWorker from './serviceWorker';

let MockNews = {
    source: {
        name: 'Nome Teste'
    },
    title: 'Titulo Teste',
    author: 'Autor Teste',
    description: 'Descrição Teste',
    imageToUrl: 'https://via.placeholder.com/350',
    publishedAt: '2020-08-06T11:03:01Z',
    content: 'Content Teste'
};



ReactDOM.render(
  <React.StrictMode>
    <Card news={MockNews}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
