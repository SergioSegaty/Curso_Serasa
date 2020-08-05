import { NewsAPI } from "../js/fetchNews.js"

const op = {
    'everything': 'everything?',
    'top': 'top-headlines?'
}
export default class Test_NewsAPI {

    constructor() {

    }

    async testGetAll(option, n) {
        console.log('Test_NewsApi - GetAll Unit Test');
        let api = new NewsAPI();

        let result = await api.getAll(option, n);

        if (Array.isArray(result)) {
            console.log('NewsApi.getAll() - returned an Array. It is Working');
        } else {
            console.log('NewsApi.getAll() - did not return an Array. It is not working properly');
        }
    }

    testGetUrl(option, n) {
        console.log('Test_NewsApi - GetUrl Unit Test');
        debugger;
        const staticUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=74b3fd2332654343a940903d9a1f267c'

        let api = new NewsAPI();

        let testUrl = api.getUrl(option, n);

        if (staticUrl === testUrl) {
            console.log('NewsAPI.getUrl() is working.');
        } else {
            console.log('NewsAPI_getUrl() is not workking properly');
        }
    }
}

let testApi = new Test_NewsAPI()
testApi.testGetUrl(op.top, 'us');
testApi.testGetAll(op.everything, 'bitcoin');
