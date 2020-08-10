import Controller from "./Controller.js";
import News from "../model/News.js";

export default function Renderer(controller) {
    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Takes a News object as parameter and returns a Rendered Card populated with the news.
     * @param {News} article
     */
    const renderCard = article => {
        let body = document.createElement("div");
        body.setAttribute("class", "card");

        let row = document.createElement("div");
        row.setAttribute("class", "row");

        let title = document.createElement("h2");
        title.setAttribute("class", "title");
        title.innerHTML = article.title;

        row.append(title);
        body.append(row);

        let auth = document.createElement("span");
        auth.setAttribute("class", "auth");
        auth.innerHTML = article.author;

        body.append(auth);

        let img = document.createElement("div");
        img.setAttribute("class", "img");
        img.style.backgroundImage = "url(" + article.imageUrl + ")";
        body.append(img);

        let content = document.createElement("div");
        content.setAttribute("class", "content");

        let dateTime = document.createElement("h4");
        dateTime.innerHTML = cleanDate(article.publishedAt);
        content.append(dateTime);

        let p = document.createElement("p");
        p.innerHTML = article.description;
        content.append(p);
        body.append(content);

        let footer = renderFooter(article);
        body.append(footer);

        return body;
    };

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Takes the article, renders the footer with buttons and adds the Listeners.
     * @param {News} article
     */
    const renderFooter = article => {
        let footer = document.createElement("div");
        footer.setAttribute("class", "footer");

        let socialB = document.createElement("div");
        socialB.setAttribute("class", "socialB");
        footer.append(socialB);

        let buttonFav = document.createElement("div");
        buttonFav.setAttribute("class", "buttons");
        buttonFav.addEventListener("click", e => controller.saveToDb(article));

        let iconFav = document.createElement("i");
        iconFav.setAttribute("class", "fa fa-heart");
        buttonFav.append(iconFav);

        let buttonTwit = document.createElement("div");
        buttonTwit.setAttribute("class", "buttons");
        buttonTwit.addEventListener("click", e => clickTwitter(article));

        let iconTwit = document.createElement("div");
        iconTwit.setAttribute("class", "fa fa-twitter");
        buttonTwit.append(iconTwit);

        socialB.append(buttonFav);
        socialB.append(buttonTwit);
        footer.append(socialB);

        return footer;
    };

    /**
     * @since 1.0.0
     * @author Heitor Ugarte <heitorsilveirafurb@gmail.com>
     * Renders the country options list to populate the dropdown on the main page.
     * Also adds an 'onchange' eventListener to update the article list when
     * selecting a new country from the dropdown.
     */
    const renderCountryOptions = () => {
        let dropdownPaises = document.getElementById("ddPaises");
        let countryKeys = Object.keys(controller.paises);

        for (let index = 0; index < countryKeys.length; index++) {
            const sigla = countryKeys[index];
            const pais = controller.paises[sigla];
            let option = document.createElement("option");
            option.appendChild(document.createTextNode(pais));
            option.value = sigla;
            dropdownPaises.appendChild(option);
        }
        dropdownPaises.addEventListener("change", () => {
            dropdownPaises.value == "all" ?
                (document.getElementById("inputQuery").style.display = "block") :
                (document.getElementById("inputQuery").style.display = "none");
            controller.refreshArticleList(dropdownPaises.value);
        });
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
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Takes the Date and Parses it to a more readable string.
     * @param {string} date
     */
    const cleanDate = date => {
        let key = "-";
        let fixedDate = date
            .replace("Z", "")
            .replace(/[/-]/g, char => key[char] || "/")
            .split("T")
            .join(" - ");
        return fixedDate;
    };

    /**
     * @since 1.0.0
     * @author Heitor Ugarte <heitorsilveirafurb@gmail.com>
     * Returns the current dropdown value (country option) to use as a parameter
     * on the API request (country key, ISO-3166).
     * @returns {string} country ISO-3166
     */
    const getSelectedCountry = () => {
        return document.getElementById("ddPaises").value;
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