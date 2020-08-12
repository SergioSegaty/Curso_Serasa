import News from "../Models/News.js";
//import Renderer from "./View.js";

const op = {
  everything: "everything?",
  top: "top-headlines?",
};
const transformsToNewsArray = (articles) => {
  let articlesList = [];

  articles.forEach((a) => {
    let newObj = new News(a);
    articlesList.push(newObj);
  });
  return articlesList;
};

let baseUrl = "https://newsapi.org/v2/";
let apiKey = "&apiKey=74b3fd2332654343a940903d9a1f267c";

/**
 * @since 1.0.0
 * @author Sergio Segaty <sergio.segaty@gmail.com>
 * NewsApi controls the fetch and manipulation of the News Data.
 */
export class NewsAPI {
  /**
   * @since 1.0.0
   * @author Sergio Segaty <sergio.segaty@gmail.com>
   * It recieves a options object and a string that can be N.
   * For a GetAll, N is a word for query ie: 'bitcoin', 'trump', 'beirut'.
   * For a GetTop, N is a Acronym for the target country ie: us, br, en, ca.
   * @param {op} options
   * @param {String} n
   */
  getUrl(options, n) {
    let url = "";
    switch (options) {
      case op.everything:
        let query = "q=" + n;
        url = baseUrl + options + query;
        break;
      case op.top:
        let country = "country=" + n;
        url = baseUrl + options + country;
        break;
      default:
        throw new Error("getUrl() did not recieve an option");
    }

    return url + apiKey;
  }

  /**
   * @since 1.0.0
   * @author Sergio Segaty <sergio.segaty@gmail.com>
   * Asks for a query, which should be a single word used to filter the articles ie: 'bitcoin',  'trump', 'beirut'.
   * @param {String} query
   */
  getAll = async (query) => {
    if (!query) {
      query = "a";
    }
    let url = this.getUrl(op.everything, query);
    let req = await fetch(url);

    return await req.json();
  };

  /**
   * @since 1.0.0
   * @author Sergio Segaty <sergio.segaty@gmail.com>
   * Asks for a country, which should be a Acronym of the target country, ie: us, br, en, ca.
   * @param {String} country
   */
  getTop = (country) => {
    let url;
    if (!country) {
      url = this.getUrl(op.top, "br");
    } else {
      url = this.getUrl(op.top, country);
    }
    // let query = Renderer(this).getQuery();
    // if (query != "") {
    // }
    
    return new Promise(async (resolve) => {
        try {
          let req = await fetch(url);
          let result = await req.json();
          resolve(result.articles);
        } catch (e) {
          throw e;
        }
    });
  };
}
