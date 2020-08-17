import React, { useEffect } from "react";
import "./App.css";
import Card from "./View/Component/Card/Card";
import NavBar from "./View/Component/NavBar/NavBar";
import { Controller } from "JavaScript/Controller";
import { NewsAPI } from "./JavaScript/NewsAPI_DAO";
import { NewsDB } from "./JavaScript/IndexedDB_DAO";
import { connect } from "react-redux";

const IndexedDB = new NewsDB("NewsDB", "FavoriteNews");
const Api = new NewsAPI();
const controller = new Controller();

const App = (props) => {
  let search = {};

  useEffect(() => {
    if(props.items === undefined){
      router();
    }
   })

  let procurarPais = (pais) => {
    search = pais;
    router("#top");
  };

  let procurarQuery = (query) => {
    search = query;
    router("#all");
  };

  let metodos = {
    porPais: procurarPais,
    porQuery: procurarQuery,
  };

  const router = (route) => {
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
      IndexedDB.getAllNews().then(favReults => {
        favReults.map(fav => {
          result.map(article => {
              if(article.title === fav.title){
                article.favorited = true;
              }
            })
          })
          props.dispatch({ type: "UPDATE", items: result, route: route, search: search });
      })
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <NavBar
          metodos={metodos}
          router={router}
          route={props.route}
        ></NavBar>
      </header>
      <div id="mainContainer">
        {props.items && props.items.map((article) => (
          <Card news={article} key={article.title} controller={controller} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    route: state.route,
    search: state.search,
  };
};

export default connect(mapStateToProps)(App);
