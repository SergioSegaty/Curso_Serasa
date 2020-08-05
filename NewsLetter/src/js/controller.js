import { NewsAPI } from "./fetchNews.js";
import { Test_NewsDAO } from '../UnitTests/test_newsDAO.js';
import { NewsDB } from './newsDAO.js';
import Renderer from "./renderer.js";

const op = {
    'everything': 'everything?',
    'top': 'top-headlines?'
}

export default class Controller {

    constructor() {

    }

    startController = async () => {
        let db = new NewsDB('NewsDB', 'FavNews');
        db.startDB();

        let api = new NewsAPI();
        let newsList = await api.getAll(op.top, 'us');
        console.log(newsList);

        let body = document.querySelector('body');

        newsList.forEach(article => {
            let card = Renderer().renderCard(article);
            body.append(card);
        })

    }

    saveToDb = async (tarefa) => {
        console.log('Salvando no DB');
        new NewsDB().addNewsToFav(tarefa);
    }

}

// let ctrl = new Controller();
// ctrl.startController();

let DAOtests = new Test_NewsDAO();
DAOtests.Test_addNewsToFav();
