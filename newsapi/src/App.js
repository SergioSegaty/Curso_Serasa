import React from "react";
import "./App.css";
import Card from "./View/Component/Card/Card";
import NavBar from "./View/Component/NavBar/NavBar";
import { Controller } from "JavaScript/Controller";
import { NewsAPI } from "./JavaScript/NewsAPI_DAO";
import { NewsDB } from "./JavaScript/IndexedDB_DAO";

const IndexedDB = new NewsDB("NewsDB", "FavoriteNews");
const Api = new NewsAPI();
const controller = new Controller();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.items = props.articles;

    this.state = {
      isLodaded: false,
      error: null,
      search: {},
      items: [],
    };
  }

  componentDidMount() {
    this.router();
  }

  procurarPais = (pais) => {
    this.state.search = pais;
    this.router("#top");
  };

  procurarQuery = (query) => {
    this.state.search = query;
    this.router("#all");
  };

  metodos = {
    porPais: this.procurarPais,
    porQuery: this.procurarQuery,
  };

  router = (route) => {
    debugger;
    let search = this.state.search;
    let result;

    switch (route) {
      case "#top":
        result = Api.getTop(search);
        break;
      case "#all":
        result = Api.getAll(search);
        break;
      case "#fav":
        result = IndexedDB.getAllNews();
        break;
      default:
        result = Api.getTop();
        break;
    }

    result.then((result) => {
      this.setState({
        items: result,
        route: route,
      });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar
            metodos={this.metodos}
            router={this.router}
            route={this.state.route}
            search={this.state.search}
          ></NavBar>
        </header>
        <div id="mainContainer">
          {this.state.items.map((article) => (
            <Card news={article} key={article.title} controller={controller} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
