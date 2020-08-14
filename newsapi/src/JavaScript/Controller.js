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
}
