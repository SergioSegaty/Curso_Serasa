import News from '../model/newsModel.js';

const url =
    'http://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=74b3fd2332654343a940903d9a1f267c';

const fetchNews = async(url) => {
    let response = await fetch(url)
    let json = await response.json();

    return json.articles;
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
    console.log('Lista é: ');
    console.log(list);
    return list;
}