import { NewsAPI } from "../js/FetchNews.js"

const op = {
    'everything': 'everything?',
    'top': 'top-headlines?'
}
export class Test_NewsAPI {

    constructor() {

    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * The query should be a string with one word.
     * @param {String} query 
     */
    async testGetAll(query) {
        console.log('Test_NewsApi - GetAll Unit Test');
        let api = new NewsAPI();
        let result = await api.getAll(op.everything, query);

        if (Array.isArray(result)) {
            console.log('NewsApi.getAll() - returned an Array. It is Working');
        } else {
            console.log('NewsApi.getAll() - did not return an Array. It is not working properly');
        }
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * The query should be a string with one word.
     * @param {String} query 
     */
    testGetUrlGetAll(query) {
        console.log('Test_NewsApi - GetUrl - GetAll - Unit Test');
        let staticUrl = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=74b3fd2332654343a940903d9a1f267c'
        let api = new NewsAPI();

        let testUrl = api.getUrl(op.everything, query);
        if (staticUrl == testUrl) {
            console.log('NewsAPI.getUrl()-GetAll is working.');
        } else {
            console.log('NewsAPI_getUrl()-GetAll is not workking properly');
        }
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * The country should be only initials, ie: us, br, ca, en.
     * @param {String} country 
     */
    async testGetTop(country) {
        console.log('Test_NewsApi - GetTop Unit Test');
        let api = new NewsAPI();
        let result = await api.getTop(op.top, country);

        if (Array.isArray(result)) {
            console.log('News.Api.getTop() - returned an Array. It is Working');

        } else {
            console.log('NewsApi.getTop() - did not return an Array. it is not working properly');
        }
    }


    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * The country should be only initials, ie: us, br, ca, en.
     * @param {String} country 
     */
    testGetUrlGetTop(country) {
        console.log('Test_NewsApi - GetUrl - GetTop -  Unit Test');
        let staticUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=74b3fd2332654343a940903d9a1f267c'
        let api = new NewsAPI();

        let testUrl = api.getUrl(op.top, country);

        if (staticUrl === testUrl) {
            console.log('NewsAPI.getUrl()-GetTop is working.');
        } else {
            console.log('NewsAPI_getUrl()-GetTop is not workking properly');
        }
    }
}