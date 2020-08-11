import Controller from "./Controller.js";
import News from "../model/News.js";

export default function Renderer(controller) {
    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Takes a News object as parameter and returns a Rendered Card populated with the news.
     * @param {News} article
     */
    const renderCard = (article) => {
        let title = React.createElement('h2', { className: 'title' }, article.title);

        let row = React.createElement('div', { className: 'row' }, title);

        let auth = React.createElement('span', { className: 'auth' }, article.author);

        let img = React.createElement('div', {
            className: 'img',
            style: {
                backgroundImage: "url(" + article.imageUrl + ")"
            }
        });

        let p = React.createElement('p', { key: `p${article.title}` }, article.description);

        let dateTime = React.createElement('h4', { key: article.title }, article.publishedAt)

        let content = React.createElement('div', { className: 'content' }, [dateTime, p]);

        let footer = renderFooter(article);

        let body = React.createElement(
            'div', { className: 'card', key: article.title }, [row, auth, img, content, footer]
        );

        return body;
    };

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Takes the article, renders the footer with buttons and adds the Listeners.
     * @param {News} article
     */
    const renderFooter = article => {

        let iconFav = React.createElement('i', { className: 'fa fa-heart', key: `if${article.title}` })
        let buttonFav = React.createElement('div', { className: 'buttons', onClick: (e) => controller.saveToDb(article) }, [iconFav])

        let iconTwit = React.createElement('i', { className: 'fa fa-twitter', key: `it${article.title}` });
        let buttonTwit = React.createElement('div', { className: 'buttons', onClick: (e) => clickTwitter(article) }, [iconTwit]);

        let socialB = React.createElement('div', { className: 'socialB', key: `sb${article.title}` }, [buttonFav, buttonTwit]);

        let footer = React.createElement('div', { className: 'footer', key: `foot${article.title}` }, [socialB]);

        return footer;
    };

    /**
     * @since 1.0.0
     * @author Heitor Ugarte <heitorsilveirafurb@gmail.com>
     * Renders the country options list to populate the dropdown on the main page.
     * Also adds an 'onchange' eventListener to update the article list when
     * selecting a new country from the dropdown.
     */
    const renderCountryOptions = (country) => {
        let countryKeys = Object.keys(controller.paises);

        let optionsList = [];

        for (let index = 0; index < countryKeys.length; index++) {
            let props = {};

            const sigla = countryKeys[index];
            const pais = controller.paises[sigla];

            props['value'] = sigla
            props['key'] = index

            if (sigla === country) props.defaultValue = "br";
            optionsList.push(React.createElement('option', props, pais));
        }

        let dropdownPaises = React.createElement('select', {
            onChange: (e) => {
                e.target.value == "all" ?
                    (document.getElementById("inputQuery").style.display = "block") :
                    (document.getElementById("inputQuery").style.display = "none");
                controller.refreshArticleList('top', e.target.value);
            },
            id: 'ddPaises',
        }, [optionsList]);

        let inputQuery = React.createElement('input', {
            id: 'inputQuery',
            type: 'text',
            placeholder: 'Search...',
            onKeyDown: (e) => {
                if (e.keyCode == 13) {
                    controller.refreshArticleList('all',
                        document.getElementById("inputQuery").value
                    );
                }
            },
            style: {
                display: 'none'
            }
        });
        return [dropdownPaises, inputQuery];
    };

    /**
     * @since 1.0.0
     * @author Heitor Ugarte <heitorsilveirafurb@gmail.com>
     * Method used to add an event listener on the text input component
     * and set the default display style to none, since the deafult value
     * for the country dropdown is "Brazil" and querys are only allowed
     * when using the "Everything" option.
     * As for the listener itself, when any button is pressed and the text component
     * is focused, it checks if the pressed key equals the enter key (keyCode 13),
     * if so, refreshes the article list based on the query informed.
     */
    const createQueryListener = () => {
        let inputQuery = document.getElementById("inputQuery");
        inputQuery.style.display = "none";
        inputQuery.onkeydown = e => {
            if (e.keyCode == 13) {
                controller.refreshArticleList(
                    document.getElementById("ddPaises").value
                );
            }
        };
    };

    /**
     * @since 1.0.0
     * @author Heitor Ugarte <heitorsilveirafurb@gmail.com>
     * Returns the current value (query) on the input component.
     * @returns {string} query value
     */
    const getQuery = () => {
        return document.getElementById("inputQuery").value;
    };


    /**
     * @since 1.0.0
     * @author Heitor Ugarte <heitorsilveirafurb@gmail.com>
     * Returns the current dropdown value (country option) to use as a parameter
     * on the API request (country key, ISO-3166).
     * @returns {string} country ISO-3166
     */
    const getSelectedCountry = () => {
        let a = document.getElementById("ddPaises").value;
        return
    };

    return {
        renderCard,
        renderFooter,
        renderCountryOptions,
        getSelectedCountry,
        createQueryListener,
        getQuery
    };
}