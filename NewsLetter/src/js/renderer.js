import Controller from "./controller.js";
import News from "../model/newsModel.js";

export default function Renderer() {
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
    buttonFav.addEventListener("click", e =>
      new Controller("").saveToDb(article)
    );

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

  const renderCountryOptions = countryList => {
    let dropdownPaises = document.getElementById("ddPaises");
    let countryKeys = Object.keys(countryList);

    for (let index = 0; index < countryKeys.length; index++) {
      const sigla = countryKeys[index];
      const pais = countryList[sigla];
      let option = document.createElement("option");
      option.appendChild(document.createTextNode(pais));
      option.value = sigla;
      dropdownPaises.appendChild(option);
      dropdownPaises.onchange = ctrl.refreshArticleList(dropdownPaises.value);
    }
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

  return {
    renderCard,
    renderFooter,
    renderCountryOptions
  };
}
