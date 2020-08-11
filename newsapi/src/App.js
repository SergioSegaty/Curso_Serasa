import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Card from "./View/Component/Card/Card.js";
import { NewsAPI } from "./JavaScript/NewsAPI_DAO";


// let MockNews = [{
//   source: {
//     name: 'Nome Teste'
//   },
//   title: 'Titulo Teste',
//   author: 'Autor Teste',
//   description: 'Descrição Teste',
//   imageToUrl: 'https://via.placeholder.com/350',
//   publishedAt: '2020-08-06T11:03:01Z',
//   content: 'Content Teste'
// },{
//   source: {
//     name: 'Nome Teste'
//   },
//   title: 'Titulo Teste',
//   author: 'Autor Teste',
//   description: 'Descrição Teste',
//   imageToUrl: 'https://via.placeholder.com/350',
//   publishedAt: '2020-08-06T11:03:01Z',
//   content: 'Content Teste'
// },{
//   source: {
//     name: 'Nome Teste'
//   },
//   title: 'Titulo Teste',
//   author: 'Autor Teste',
//   description: 'Descrição Teste',
//   imageToUrl: 'https://via.placeholder.com/350',
//   publishedAt: '2020-08-06T11:03:01Z',
//   content: 'Content Teste'
// }];npm

const getNews = async () => {
  let api = new NewsAPI();

  let list = await api.getTop('br');
  debugger;
  return list;
}

function App() {
  let news = getNews();
  return (
    <div className="App">
      <header className="App-header">
        {

          <Card news={news} />

        }
      </header>
    </div>
  );
}

export default App;
