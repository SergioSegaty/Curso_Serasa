import { NewsDB } from "./IndexedDB_DAO";

const IndexedDB = new NewsDB("NewsDB", "FavoriteNews");

export class Controller {
  FavNews = (news) => {
    news = JSON.stringify(news);
    IndexedDB.addNewsToFav(JSON.parse(news));
  };

  RedirectToPage = (url) => {
    let win = window.open(url, "_blank");
    win.focus();
  };

  // goToRoute = () => {
  //   debugger;
  //   let items = [];
  //   let route = window.location.pathname;
  //   switch (route) {
  //     case "/top":
  //      Api.getTop().then(result => {
  //        items = result;
  //      });
  //       break;
  //     case "/all":
  //       items = Api.getAll();
  //       break;
  //     case "/fav":
  //       items = IndexedDB.getAllNews();
  //       break;
  //     default:
  //       Api.getTop().then(result => {
  //         items = result;
  //       });
  //       break;
  //   }
    // ReactDOM.render(
    //   <React.StrictMode>
    //     <App route={route} controller={this} items={items} />
    //   </React.StrictMode>,
    //   document.getElementById("root")
    // );
 // };
}
