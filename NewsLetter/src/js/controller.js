import { NewsAPI } from "./fetchNews.js";
import { Test_NewsDAO } from '../UnitTests/test_newsDAO.js';
import { Test_NewsAPI } from '../UnitTests/test_newsAPI.js';
import { NewsDB } from './newsDAO.js';
import Renderer from "./renderer.js";
import News from "../model/newsModel.js";

const op = {
    'everything': 'everything?',
    'top': 'top-headlines?'
}

export default class Controller {

    constructor() {

    }


    /**
     * Start the Controller which starts the DB, does a get into the NewsAPI and renders the Cards.
     * Call this function to start the magic.
     * The Api is set to get the Top 20 articles of the target country, in this case Us.
     */
    startController = async () => {
        let db = new NewsDB('NewsDB', 'FavNews');
        db.startDB();

        let api = new NewsAPI();
        let newsList = await api.getTop('us');
        console.log(newsList);

        let body = document.querySelector('body');

        newsList.forEach(article => {
            let card = Renderer().renderCard(article);
            body.append(card);
        })
    }

    /**
     * Saves a favorited article to the IndexedDB.
     * @param {News} article 
     */
    saveToDb = async (article) => {
        console.log('Salvando no DB');
        new NewsDB().addNewsToFav(article);
    }

    /**
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
     * Executes every test for Data Acess Object.
     */
    startDAOTests = () => {
        let DAOtests = new Test_NewsDAO();
        DAOtests.Test_Connection();
        DAOtests.Test_addNewsToFav();
        DAOtests.Test_GetAll();
    }

}

// let ctrl = new Controller();
// ctrl.startController();

