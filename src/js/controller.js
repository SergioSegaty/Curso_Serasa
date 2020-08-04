import NewsDb from "./newsDAO.js";
import fetchAll from "./fetchNews.js";
import Renderer from "./renderer.js";

export default function Controller() {
    const mainController = async() => {
        NewsDb().startDB();

        let newsList = await fetchAll();

        let body = document.querySelector('body');

        newsList.forEach(article => {
            let card = Renderer().renderCard(article);
            body.append(card);
        })

    }

    const saveToDb = async(tarefa) => {
        debugger;
        console.log('Salvando no DB');
        NewsDb().addNewsToFav(tarefa);
    }

    return {
        mainController,
        saveToDb
    }
}

Controller().mainController();