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

// const getNews = async () => {
//   let api = new NewsAPI();

//   let list = await api.getTop('br');
//   debugger;
//   return list;
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    new NewsAPI().getTop()
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result,
          });
          debugger;
        }
        // (error) => {
        //   this.setState({
        //     isLoaded: true,
        //     error
        //   });
        // }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (isLoaded) {
      return <div>Loading...</div>
    } else {
      return <div className="App">
        <header className="App-header">
          {
            <Card news={items[0]} />
          }
        </header>
      </div>
    }
  }
}

export default App;
