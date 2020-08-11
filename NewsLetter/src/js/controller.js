import News from "../model/News.js";
import { Paises } from '../model/Paises.js';
import Renderer from "./View.js";
import { NewsAPI } from "./FetchNews.js";
import { NewsDB } from "./IndexedDB.js";
import { Test_NewsDAO } from "../UnitTests/test_newsDAO.js";
import { Test_NewsAPI } from "../UnitTests/test_newsAPI.js";
import { Test_Renderer } from "../UnitTests/test_Renderer.js";

const op = {
    everything: "everything?",
    top: "top-headlines?"
};

export default class Controller {
    routes = {
        "": "index",
        "#favNews": "favorites"
    };

    constructor() {
        this.paises = new Paises().paises;
        this.route = this.routes[window.location.hash];
        this.startController();
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Start the Controller which starts the DB, does a get into the NewsAPI and renders the Cards.
     * Call this function to start the magic.
     * The Api is set to get the Top 20 articles of the target country, in this case Us.
     */
    startController = async() => {
        let db = new NewsDB("NewsDB", "FavNews");
        db.startDB();

        let main = document.querySelector("#main");
        let defaultCountry = 'br';

        let mainHeader = document.querySelector('#mainHeader');

        let header = React.createElement('div', { className: 'header', id: 'selectPais' });
        ReactDOM.render(header, mainHeader)

        let optionsSelect = Renderer(this).renderCountryOptions(defaultCountry);

        let newsList = await this.getData('top', defaultCountry);
        let arrayCards = [];

        newsList.forEach(article => {
            let card = Renderer(this).renderCard(article);
            arrayCards.push(card);
        });

        ReactDOM.render(optionsSelect, mainHeader);
        ReactDOM.render(arrayCards, main);
    };

    /**
     * Manages to separate the Index Route from the Favorites Route and direct them
     * to their respectives APIs.
     */
    getData = async(option, query) => {
        let articleList;
        let dao;
        try {
            if (this.route === "favorites") {
                dao = new NewsDB("NewsDB", "FavNews");
                articleList = await dao.getAllNews();
            } else if (this.route === "index") {
                dao = new NewsAPI();
                if (option === 'top')
                    articleList = await dao.getTop(query);
                else
                    articleList = await dao.getAll(query);
            }
        } catch (e) {
            console.log("Error choosing routes");
            throw e;
        }

        return articleList;
    };

    refreshArticleList = (option, country) => {
        this.getData(option, country).then(newsList => {
            let main = document.getElementById("main");
            let articleList = [];
            newsList.forEach(article => {
                let card = Renderer(this).renderCard(article);
                articleList.push(card);
            });
            ReactDOM.render(articleList, main);
        });
    };

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Saves a favorited article to the IndexedDB.
     * @param {News} article
     */
    saveToDb = async article => {
        console.log("Salvando no DB");

        article = JSON.parse(JSON.stringify(article));
        console.log(article);

        new NewsDB("NewsDB", "FavNews").addNewsToFav(article);
    };

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Executes every test for the NewsAPI.
     */
    startApiTests = () => {
        let testApi = new Test_NewsAPI();
        testApi.testGetUrlGetAll("bitcoin");
        testApi.testGetAll("bitcoin");
        testApi.testGetUrlGetTop("us");
        testApi.testGetTop("us");
    };

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
    };

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Execute eery test for Renderer Function
     */
    startsRenderTests = () => {
        let rendererTests = new Test_Renderer();
        rendererTests.Test_RenderCard();
        rendererTests.Test_RenderFooter();
    };
}