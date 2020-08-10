import News from "../model/News.js";
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

    paises = {
        br: "Brasil",
        all: "Everything",
        ae: "United Arab Emirates",
        ar: "Argentina",
        at: "Austria",
        au: "Australia",
        be: "Belgium",
        bg: "Bulgaria",
        ca: "Canada",
        ch: "Switzerland",
        cn: "China",
        co: "Colombia",
        cu: "Cuba",
        cz: "Czechia",
        de: "Germany",
        eg: "Egype",
        fr: "France",
        gb: "United Kingdom",
        gr: "Greee",
        hk: "Hong Kong",
        hu: "Hungary",
        id: "Indonesia",
        ie: "Ireland",
        il: "Israel",
        in: "India",
        it: "Italy",
        jp: "Japan",
        kr: "Korea",
        lt: "Lithuania",
        lv: "Latvia",
        ma: "Morocco",
        mx: "Mexico",
        my: "Malaysia",
        ng: "Nigeria",
        nl: "Netherlands",
        no: "Norway",
        nz: "New Zealand",
        ph: "Philippines",
        pl: "Poland",
        pt: "Portugal",
        ro: "Romania",
        rs: "Serbia",
        ru: "Russia",
        sa: "Saudi Arabia",
        se: "Sweden",
        sg: "Singapore",
        si: "Slovenia",
        sk: "Slovakia",
        th: "Thailand",
        tr: "Turkey",
        tw: "Taiwan",
        ua: "Ukraine",
        us: "United States of America",
        ve: "Venezuela",
        za: "South Africa"
    };

    constructor() {
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

        let body = document.querySelector("main");

        Renderer(this).renderCountryOptions();
        Renderer(this).createQueryListener();
        let newsList = await this.getData(Renderer(this).getSelectedCountry());

        newsList.forEach(article => {
            let card = Renderer(this).renderCard(article);
            body.append(card);
        });
    };

    /**
     * Manages to separate the Index Route from the Favorites Route and direct them
     * to their respectives APIs.
     */
    getData = async country => {
        let articleList;
        let dao;
        try {
            if (this.route === "favorites") {
                dao = new NewsDB("NewsDB", "FavNews");
                articleList = await dao.getAllNews();
            } else if (this.route === "index") {
                dao = new NewsAPI();
                articleList = await dao.getTop(country);
            }
        } catch (e) {
            console.log("Error choosing routes");
            throw e;
        }

        return articleList;
    };

    refreshArticleList = country => {
        this.getData(country).then(newsList => {
            let main = document.getElementsByTagName("main")[0];
            main.innerHTML = "";
            newsList.forEach(article => {
                let card = Renderer(this).renderCard(article);
                main.append(card);
            });
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

new Controller();
// ctrl.startApiTests();
// ctrl.startDAOTests();
// ctrl.startsRenderTests();