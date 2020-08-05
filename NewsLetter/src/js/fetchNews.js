import News from '../model/newsModel.js';

const fetchNews = async (url) => {
    let response = await fetch(url)
    let json = await response.json();

    return json.articles;
}

const op = {
    'everything': 'everything?',
    'top': 'top-headlines?'
}
const transformNewsObject = (articles) => {
    let articlesList = [];

    articles.forEach(a => {
        let newObj = new News(a);
        articlesList.push(newObj);
    })
    return articlesList;
}

export default async function fetchAll() {
    let list = transformNewsObject(await fetchNews(url));
    return list;
}

let baseUrl = 'https://newsapi.org/v2/';
let apiKey = '&apiKey=74b3fd2332654343a940903d9a1f267c';
let country = 'country=us';


/**
 * NewsApi controls the fetch and manipulation of the News Data.
 */
export class NewsAPI {
    constructor() {

    }

    getUrl(options, n) {
        let url = '';
        if (options === op.everything) {
            let querry = 'q=' + n;
            url = baseUrl + options + querry;
        } else {
            let country = 'country=' + n; 
            url = baseUrl + options + country;
        }
        return url + apiKey;
    }

    getAll = async (options, country) => {
        let url = this.getUrl(options, country);

        let req = await fetch(url);
        let result = await req.json();
        result = transformNewsObject(result.articles);

        return result
    }
}