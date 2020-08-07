import Renderer from "../js/renderer.js";
import News from "../model/newsModel.js";

let mockArticle = {
    source: {
        name: 'Nome Teste'
    },
    title: 'Titulo Teste',
    author: 'Autor Teste',
    description: 'Descrição Teste',
    imageToUrl: 'https://via.placeholder.com/350',
    publishedAt: '2020-08-06T11:03:01Z',
    content: 'Content Teste'
};


export class Test_Renderer {

    constructor() {


    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Tests the renderer to see if its able to render the card,
     * and then checks to see if the card was rendered properly
     */
    Test_RenderCard() {
        console.log('Card Renderer - Integration Testing');
        let article = new News(mockArticle);

        let card;
        try {
            console.log('Rendering the card. Stand by: ');
            card = Renderer().renderCard(article);
            console.log('The Card was rendered successfully');
        } catch (e) {
            console.log('There was a problem with Rendering the Card');
            throw (e);
        }


        let expectedCard_outerHTML = '<div class="card"><div class="row"><h2 class="title">' +
            'Titulo Teste</h2></div><span class="auth">Autor Teste</span>' +
            '<div class="img" style="background-image: url(&quot;https://via.placeholder.com/300&quot;);">' +
            '</div><div class="content"><h4>2020/08/06 - 11:03:01</h4>' +
            '<p>Descrição Teste</p></div><div class="footer"><div class="socialB">' +
            '<div class="buttons"><i class="fa fa-heart"></i></div><div class="buttons">' +
            '<div class="fa fa-twitter"></div></div></div></div></div>';

        if (card.outerHTML === expectedCard_outerHTML) {
            console.log('Test RenderCard - Elements asserted as equals. Renderer is working');
        } else {
            console.log('Test RenderCard - Elements are NOT equal. Test Failed');
        }
    }

    /**
     * @since 1.0.0
     * @author Sergio Segaty <sergio.segaty@gmail.com>
     * Checks to see if it is able to render the footer of the card,
     * and then checks if it was rendered as expected.
     */
    Test_RenderFooter() {
        console.log('Footer Renderer - Unit Testing');
        let expectedCardFooter_outerHTML = '<div class="footer"><div class="socialB">' +
            '<div class="buttons"><i class="fa fa-heart"></i></div><div class="buttons">' +
            '<div class="fa fa-twitter"></div></div></div></div>'

        let cardFooter;

        let article = new News(mockArticle);

        try {
            console.log('Rendering the card footer. Stand by:');
            cardFooter = Renderer().renderFooter(article);
            console.log('The Footer was rendered successfuly');

        } catch (e) {
            throw (e);
            console.log('There was a problem with Rendering the footer');
        }

        if (cardFooter.outerHTML === expectedCardFooter_outerHTML) {
            console.log('Test_RenderFooter - Elements asserted as equals. Renderer is working properly');
        } else {
            console.log('Test_RenderFooter - Elements are NOT equal. Test Failed')
        }
    }
}