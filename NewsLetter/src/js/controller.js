import News from "../model/newsModel.js";
import Renderer from "./renderer.js";
import { NewsAPI } from "./fetchNews.js";
import { NewsDB } from './newsDAO.js';
import { Test_NewsDAO } from '../UnitTests/test_newsDAO.js';
import { Test_NewsAPI } from '../UnitTests/test_newsAPI.js';
import { Test_Renderer } from "../UnitTests/test_Renderer.js";
import { App } from "./app.js";

const op = {
    'everything': 'everything?',
    'top': 'top-headlines?'
}

export default class Controller {

    routes = {
        "": 'index',
        "#favNews": 'favorites'
    }

    constructor() {
        this.route = this.routes[window.location.hash]
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Start the Controller which starts the DB, does a get into the NewsAPI and renders the Cards.
     * Call this function to start the magic.
     * The Api is set to get the Top 20 articles of the target country, in this case Us.
     */
    startController = async() => {
        let db = new NewsDB('NewsDB', 'FavNews');
        db.startDB();

        let app = new App();
        app.registerWorker();

        let newsList = await this.getData(this.route);

        let body = document.querySelector('body');

        newsList.forEach(article => {
            let card = Renderer().renderCard(article);
            body.append(card);
        })
    }

    /**
     * Manages to separate the Index Route from the Favorites Route and direct them
     * to their respectives APIs.
     */
    getData = async(route) => {
        let articleList;
        let dao;
        try {
            if (this.route === 'favorites') {
                dao = new NewsDB('NewsDB', 'FavNews');
                articleList = await dao.getAllNews();
            } else if (this.route === 'index') {
                dao = new NewsAPI()
                articleList = await dao.getTop('us');
            }

        } catch (e) {
            console.log('Error choosing routes');
            throw (e);
        }

        return articleList;
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Saves a favorited article to the IndexedDB.
     * @param {News} article 
     */
    saveToDb = async(article) => {
        console.log('Salvando no DB');

        article = JSON.parse((JSON.stringify(article)));
        console.log(article);

        new NewsDB('NewsDB', 'FavNews').addNewsToFav(article);
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Executes every test for the NewsAPI.
     */
    startApiTests = () => {
        let testApi = new Test_NewsAPI();
        testApi.testGetUrlGetAll('bitcoin');
        testApi.testGetAll('bitcoin');
        testApi.testGetUrlGetTop('us');
        testApi.testGetTop('us');
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Executes every test for Data Acess Object.
     */
    startDAOTests = () => {
        let DAOtests = new Test_NewsDAO();
        DAOtests.Test_Connection();
        DAOtests.Test_addNewsToFav();
        DAOtests.Test_GetAll();
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Execute eery test for Renderer Function
     */
    startsRenderTests = () => {
        let rendererTests = new Test_Renderer;
        rendererTests.Test_RenderCard();
        rendererTests.Test_RenderFooter();
    }

}

let ctrl = new Controller();
ctrl.startController();
// ctrl.startApiTests();
// ctrl.startDAOTests();
// ctrl.startsRenderTests();