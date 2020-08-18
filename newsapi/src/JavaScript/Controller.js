import { NewsDB } from "./IndexedDB_DAO";

const IndexedDB = new NewsDB("NewsDB", "FavoriteNews");

export class Controller {
  FavNews = async (news, event) => {
    news = JSON.parse(JSON.stringify(news));

    let svg = event.target.firstChild;

    if (news.favorited === false) {
      news.id = await IndexedDB.addNewsToFav(news);
      news.favorited = true;
      svg.classList.add("faved");
    } else {
      svg.classList.remove("faved");
      await IndexedDB.deleteNewsById(news.id);
      news.favorited = false;
    }
    return news;
  };

  RedirectToPage = (url) => {
    let win = window.open(url, "_blank");
    win.focus();
  };
}
