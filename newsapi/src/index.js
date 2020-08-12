import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {Controller} from "JavaScript/Controller";
import { NewsAPI } from "./JavaScript/NewsAPI_DAO";
import { NewsDB } from "./JavaScript/IndexedDB_DAO";

const IndexedDB = new NewsDB("NewsDB", "FavoriteNews");
const Api = new NewsAPI();
const controller = new Controller();

let route = window.location.pathname;
let items = [];

switch (route) {
  case "/top":
   Api.getTop().then(result => {
     result(items);
   });
    break;
  case "/all":
    items = Api.getAll();
    break;
  case "/fav":
    items = IndexedDB.getAllNews();
    break;
  default:
    console.log(
    Api.getTop().then(result => {
      result(items);
    }));
    break;
}

ReactDOM.render(
  <React.StrictMode>
    <App controller={controller} items={items}/>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
