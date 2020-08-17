import { NewsDB } from "./IndexedDB_DAO";

const IndexedDB = new NewsDB("NewsDB", "FavoriteNews");

export class Controller {
  FavNews = (news, event) => {
    let svg = event.target.firstChild;
    if (news.favorited === false) {
      news = JSON.stringify(news);
      IndexedDB.addNewsToFav(JSON.parse(news));
      svg.classList.add('faved');
    } else {
      svg.classList.remove('faved');
      // TODO : Criar no Indexed DB uma função que remova o News. IndexedDB.
    }
  };

  RedirectToPage = (url) => {
    let win = window.open(url, "_blank");
    win.focus();
  };
}
